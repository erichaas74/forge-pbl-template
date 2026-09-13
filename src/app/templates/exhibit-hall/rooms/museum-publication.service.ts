import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { ExhibitHallRuntimeService } from '../runtime/exhibit-hall-runtime.service';
import { EXHIBIT_HALL_SESSION_CONTEXT, MUSEUM_PUBLICATION } from '../runtime/exhibit-hall.tokens';
import {
  MuseumPublicationError,
  museumRoomContent,
  museumScopeKey,
  type MuseumPublicationScope,
  type MuseumPublicationSession,
  type PublishedMuseumRoom,
} from './museum-publication';

/** Coordinates network publication; the existing runtime still owns editable drafts. */
@Injectable()
export class MuseumPublicationService implements OnDestroy {
  private readonly runtime = inject(ExhibitHallRuntimeService);
  private readonly host = inject(EXHIBIT_HALL_SESSION_CONTEXT, { optional: true });
  private readonly adapter = inject(MUSEUM_PUBLICATION, { optional: true });
  readonly shared = this.host?.authorityMode === 'serverAuthoritative';
  readonly status = signal<'local' | 'connecting' | 'ready' | 'error'>(
    this.shared ? 'connecting' : 'local',
  );
  readonly ready = computed(() => this.status() === 'local' || this.status() === 'ready');
  readonly submitting = signal(false);
  readonly error = signal<string | undefined>(undefined);
  readonly collection = signal<readonly PublishedMuseumRoom[] | undefined>(
    this.shared ? [] : undefined,
  );
  readonly collectionLoading = signal(false);
  readonly collectionError = signal<string | undefined>(undefined);
  private scope?: MuseumPublicationScope;
  private generation = 0;
  private destroyed = false;
  constructor() {
    if (this.shared) void this.connect();
  }
  ngOnDestroy(): void {
    this.destroyed = true;
    this.generation++;
  }

  async connect(): Promise<boolean> {
    if (!this.shared) return true;
    const generation = ++this.generation;
    this.runtime.roomPublishingLock.set(true);
    this.status.set('connecting');
    this.error.set(undefined);
    try {
      if (!this.adapter || !this.host?.classId)
        throw new MuseumPublicationError('MUSEUM_UNAVAILABLE');
      const scope: MuseumPublicationScope = {
        tenantId: this.host.tenantId,
        classId: this.host.classId,
        projectId: this.runtime.config.projectId,
        projectVersion: this.runtime.config.projectVersion,
        museumId: this.runtime.config.projectInstanceId,
      };
      const session = await this.adapter.openSession(scope);
      if (this.destroyed || generation !== this.generation) return false;
      this.checkSession(session, scope);
      this.scope = scope;
      if (session.publishedRoom) this.accept(session.publishedRoom);
      this.runtime.roomPublishingLock.set(session.submissionLocked);
      this.status.set('ready');
      if (session.submissionLocked && !session.publishedRoom)
        this.error.set(
          'Your teacher has closed room submissions. Your draft is still available in this room.',
        );
      return true;
    } catch (error) {
      if (!this.destroyed && generation === this.generation) {
        this.status.set('error');
        this.error.set(publicationMessage(error));
      }
      return false;
    }
  }
  async submit(): Promise<boolean> {
    if (!this.shared) return this.runtime.submitMuseumRoom();
    if (
      this.submitting() ||
      !this.ready() ||
      !this.runtime.canEditRoom() ||
      !this.runtime.roomValidation().valid
    )
      return false;
    const content = museumRoomContent(this.runtime.composerDraft());
    this.submitting.set(true);
    this.runtime.roomPublishingLock.set(true);
    this.error.set(undefined);
    try {
      // Recover a lost acknowledgment or another teammate's completed submission first.
      const session = await this.adapter!.openSession(this.scope!);
      if (this.destroyed) return false;
      this.checkSession(session, this.scope!);
      if (session.publishedRoom) {
        this.accept(session.publishedRoom);
        return true;
      }
      if (session.submissionLocked)
        throw new MuseumPublicationError('MUSEUM_ASSIGNMENT_OR_LOCK_CHANGED');
      const published = await this.adapter!.publish({
        scope: this.scope!,
        operationId: 'room-publication-v1:' + content.roomId,
        content,
      });
      if (this.destroyed) return false;
      this.accept(published);
      return true;
    } catch (error) {
      if (!this.destroyed) this.error.set(publicationMessage(error));
      return false;
    } finally {
      if (!this.destroyed) {
        this.submitting.set(false);
        this.runtime.roomPublishingLock.set(false);
      }
    }
  }
  async refreshCollection(): Promise<void> {
    if (!this.shared || !this.scope || !this.adapter || this.collectionLoading()) return;
    this.collectionLoading.set(true);
    this.collectionError.set(undefined);
    try {
      const rooms = await this.adapter.loadCollection(this.scope);
      if (!this.destroyed) this.collection.set(rooms);
    } catch (error) {
      if (!this.destroyed) this.collectionError.set(publicationMessage(error));
    } finally {
      if (!this.destroyed) this.collectionLoading.set(false);
    }
  }
  private checkSession(session: MuseumPublicationSession, scope: MuseumPublicationScope): void {
    const assigned = this.runtime.assignedRoom();
    if (
      session.actorId !== this.host?.actorId ||
      session.teamId !== this.runtime.config.viewer.teamId ||
      museumScopeKey(session.scope) !== museumScopeKey(scope) ||
      session.room.roomId !== assigned?.roomId ||
      session.room.layoutId !== assigned?.layoutId
    ) {
      throw new MuseumPublicationError('MUSEUM_ASSIGNMENT_UNAVAILABLE');
    }
  }
  private accept(published: PublishedMuseumRoom): void {
    if (
      published.teamId !== this.runtime.config.viewer.teamId ||
      published.room.roomId !== this.runtime.assignedRoom()?.roomId ||
      published.room.layoutId !== this.runtime.assignedRoom()?.layoutId
    )
      throw new MuseumPublicationError('INVALID_MUSEUM_RESPONSE');
    this.runtime.acceptSharedMuseumRoom(published.board);
  }
}
function publicationMessage(error: unknown): string {
  const code = error instanceof MuseumPublicationError ? error.code : '';
  if (code === 'AUTHENTICATION_REQUIRED')
    return 'Sign in to your school account, then reconnect to your room.';
  if (
    [
      'MUSEUM_ENROLLMENT_REQUIRED',
      'MUSEUM_ASSIGNMENT_UNAVAILABLE',
      'MUSEUM_ROOM_NOT_ASSIGNED',
    ].includes(code)
  )
    return 'Your room assignment could not be confirmed. Your teacher needs to check your class and room assignment.';
  if (code === 'MUSEUM_NOT_OPEN')
    return 'Your room is submitted. The class museum will open when your teacher is ready.';
  if (code === 'MUSEUM_ROOM_ALREADY_SUBMITTED')
    return 'This room was submitted from another session. Reconnect to view the submitted room.';
  if (code === 'MUSEUM_ASSIGNMENT_OR_LOCK_CHANGED')
    return 'Your room assignment or submission deadline changed. Reconnect before submitting again.';
  return 'The class museum could not be reached. Your draft is still here. Reconnect or try again before leaving.';
}
