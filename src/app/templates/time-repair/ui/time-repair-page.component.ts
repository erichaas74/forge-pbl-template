import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { nodeStatus } from '../domain/time-repair.engine';
import { TimeRepairRuntime } from '../runtime/time-repair.runtime';
import { TimeRepairInvestigationComponent } from './time-repair-investigation.component';
import { TimeRepairSceneComponent } from './time-repair-scene.component';

type Space = 'control' | 'archive' | 'scene' | 'ripple';
@Component({
  selector: 'app-time-repair-page',
  imports: [FormsModule, RouterLink, TimeRepairInvestigationComponent, TimeRepairSceneComponent],
  templateUrl: './time-repair-page.component.html',
  styleUrl: './time-repair-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRepairPageComponent {
  readonly runtime = inject(TimeRepairRuntime);
  readonly config = this.runtime.config;
  readonly nodes = [...this.config.nodes].sort((a, b) => a.order - b.order);
  readonly selectedNodeId = signal(this.config.missions[0].nodeId);
  readonly selectedNode = computed(() =>
    this.config.nodes.find((n) => n.id === this.selectedNodeId())!,
  );
  readonly selectedMission = computed(() =>
    this.config.missions.find((m) => m.nodeId === this.selectedNodeId()),
  );
  readonly mission = computed(
    () =>
      this.selectedMission() ??
      this.config.missions.find((m) => m.ripples.some((r) => r.nodeId === this.selectedNodeId())) ??
      this.config.missions[0],
  );
  readonly progress = computed(() => this.runtime.state().missions[this.mission().id]);
  readonly scene = computed(() => this.config.scenes.find((s) => s.id === this.mission().sceneId)!);
  readonly space = signal<Space>('control');
  readonly workspace = viewChild<ElementRef<HTMLElement>>('workspace');
  readonly report = viewChild<ElementRef<HTMLDialogElement>>('report');
  private readonly injector = inject(Injector);
  readonly verifiedCount = computed(
    () => Object.values(this.runtime.state().missions).filter((m) => !!m.verification).length,
  );
  verificationEvidenceId = '';
  verificationExplanation = '';

  status(id: string): string {
    return nodeStatus(this.config, this.runtime.state(), id);
  }
  selectNode(id: string): void {
    this.selectedNodeId.set(id);
    this.openSpace('control');
  }
  openSpace(space: Space): void {
    this.space.set(space);
    afterNextRender(
      () => {
        const element = this.workspace()?.nativeElement;
        element?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  jump(): void {
    if (this.runtime.dispatch({ type: 'jump', missionId: this.mission().id }))
      this.openSpace('scene');
  }
  verify(): void {
    this.runtime.dispatch({
      type: 'verify',
      missionId: this.mission().id,
      evidenceId: this.verificationEvidenceId,
      explanation: this.verificationExplanation,
    });
  }
  showReport(): void {
    this.report()?.nativeElement.showModal();
  }
  closeReport(): void {
    this.report()?.nativeElement.close();
  }
  exportReport(): void {
    const url = URL.createObjectURL(
      new Blob([this.runtime.caseFile()], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.config.projectId}-case-file.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  nodeTitle(id: string): string {
    return this.nodes.find((n) => n.id === id)?.title ?? id;
  }
  sourceTitle(id: string): string {
    return this.config.evidence.find((e) => e.id === id)?.title ?? id;
  }
}
