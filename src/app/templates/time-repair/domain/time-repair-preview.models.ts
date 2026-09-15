import type { TimeRepairConfig } from './time-repair.models';

export type RepairWorkspaceMode =
  'inspect' | 'repair' | 'sequence' | 'sources' | 'ripple' | 'compare' | 'exhibit' | 'tour';
export interface RepairPreviewSession {
  readonly id: string;
  readonly mode: RepairWorkspaceMode;
  readonly title: string;
  readonly action: string;
  readonly change: string;
  readonly check: string;
  readonly product: string;
  readonly missionId: string;
  readonly imageId?: string;
  readonly nodeIds: readonly string[];
  readonly evidenceIds: readonly string[];
}
export interface RepairPreviewWeek {
  readonly week: number;
  readonly title: string;
  readonly sessions: readonly RepairPreviewSession[];
  readonly questions: readonly string[];
  readonly evidence: readonly string[];
  readonly controls: readonly string[];
}
export interface RepairIllustration {
  readonly id: string;
  readonly title: string;
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}
export interface RepairExhibitPanel {
  readonly id: string;
  readonly title: string;
  readonly caption: string;
  readonly imageId: string;
  readonly evidenceId: string;
}
export interface RepairPreviewConfig {
  readonly version: '1.0';
  readonly weeks: readonly RepairPreviewWeek[];
  readonly illustrations: readonly RepairIllustration[];
  readonly sampleExhibit: readonly RepairExhibitPanel[];
}
export interface RepairPreviewTrial {
  readonly id: number;
  readonly optionId: string;
  readonly supported: boolean;
}
export interface RepairPreviewDraft {
  readonly inspectedIds: readonly string[];
  readonly nodeIds: readonly string[];
  readonly links: Readonly<Record<string, string>>;
  readonly optionId: string;
  readonly trials: readonly RepairPreviewTrial[];
  readonly panels: readonly RepairExhibitPanel[];
}
export function createRepairPreviewDraft(
  config: TimeRepairConfig,
  session: RepairPreviewSession,
): RepairPreviewDraft {
  return {
    inspectedIds: [],
    nodeIds: [...session.nodeIds],
    links: {},
    optionId: '',
    trials: [],
    panels: structuredClone(config.previewWeeks?.sampleExhibit ?? []),
  };
}
export function moveRepairItem<T>(
  items: readonly T[],
  index: number,
  offset: number,
): readonly T[] {
  const target = index + offset;
  if (
    !Number.isInteger(index) ||
    !Number.isInteger(target) ||
    index < 0 ||
    index >= items.length ||
    target < 0 ||
    target >= items.length
  )
    return items;
  const copy = [...items];
  [copy[index], copy[target]] = [copy[target], copy[index]];
  return copy;
}
/** Checks chronology against the configured sequence; this is model feedback, not assessment. */
export function chronologyConflicts(
  config: TimeRepairConfig,
  ids: readonly string[],
): readonly string[] {
  const order = new Map(config.nodes.map((node) => [node.id, node]));
  return ids.slice(1).flatMap((id, index) => {
    const previous = order.get(ids[index]);
    const current = order.get(id);
    return previous && current && previous.order > current.order
      ? [`${previous.dateLabel} comes after ${current.dateLabel}. Move “${current.title}” earlier.`]
      : [];
  });
}
