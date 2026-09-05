import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { ExhibitSnapshot, MuseumBoardSnapshotData } from '../domain/exhibit-types';
import { ExhibitHallRuntimeService } from '../runtime/exhibit-hall-runtime.service';
import { AccessibleGalleryListComponent } from './accessible-gallery-list.component';
import { ArtifactComposerComponent } from './artifact-composer.component';
import { DefensePanelComponent } from './defense-panel.component';
import { ExhibitRenderHostComponent } from './exhibit-render-host.component';
import { HallCorridorComponent } from './hall-corridor.component';
import { PeerResponseRailComponent } from './peer-response-rail.component';
import { TeacherHallDeskComponent } from './teacher-hall-desk.component';

@Component({
  selector: 'app-exhibit-hall-page',
  imports: [
    RouterLink,
    AccessibleGalleryListComponent,
    ArtifactComposerComponent,
    DefensePanelComponent,
    ExhibitRenderHostComponent,
    HallCorridorComponent,
    PeerResponseRailComponent,
    TeacherHallDeskComponent,
  ],
  templateUrl: './exhibit-hall-page.component.html',
  styleUrl: './exhibit-hall-page.component.scss',
})
export class ExhibitHallPageComponent {
  readonly runtime = inject(ExhibitHallRuntimeService);
  readonly previewSnapshot = computed<ExhibitSnapshot>(() => ({
    id: 'composer-preview',
    artifactId: `artifact-${this.runtime.config.viewer.teamId}`,
    version:
      this.runtime
        .state()
        .snapshots.filter(
          (snapshot) => snapshot.artifactId === `artifact-${this.runtime.config.viewer.teamId}`,
        ).length + 1,
    rendererType: this.runtime.config.template.rendererType,
    rendererVersion: 1,
    visitorSafeData: this.runtime.composerDraft(),
    accessibleData: {
      title: this.runtime.composerDraft().title,
      summary: this.runtime.composerDraft().centralClaim,
      sections: [],
    },
    createdBy: this.runtime.actor().id,
    createdAt: '',
  }));
  readonly myBoardPublished = computed(() =>
    this.runtime
      .state()
      .artifacts.some(
        (artifact) =>
          artifact.ownerId === this.runtime.config.viewer.teamId && artifact.status === 'published',
      ),
  );
  readonly phaseLabel = computed(() => {
    const phase = this.runtime.state().hallPhase;
    if (phase === 'async_walk') return 'Gallery walk open';
    if (phase === 'live_opening') return 'Live opening';
    if (phase === 'closed_readable') return 'Student & family showcase open';
    return 'Hall dark';
  });
  readonly roleLabel = computed(() => {
    if (this.runtime.role() === 'teacher') return this.runtime.config.viewer.teacherDisplayName;
    if (this.runtime.role() === 'family') return 'Family visitor';
    const team = this.runtime.config.teams.find(
      (item) => item.id === this.runtime.config.viewer.teamId,
    );
    return `${this.runtime.config.viewer.studentDisplayName} · ${team?.displayName ?? 'Student curator'}`;
  });
  readonly selectedBoard = computed<MuseumBoardSnapshotData | undefined>(() => {
    const value = this.runtime.selectedLocation()?.snapshot?.visitorSafeData;
    return typeof value === 'object' && value !== null && 'objects' in value
      ? (value as MuseumBoardSnapshotData)
      : undefined;
  });

  closeDefense(): void {
    this.runtime.defenseOpen.set(false);
  }
}
