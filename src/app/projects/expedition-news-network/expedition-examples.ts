import type { InquiryExample } from '../../shared/inquiry/inquiry-example.models';
import manifest from './expedition-examples.json';
import timings from './expedition-examples.timing.json';

const timing: Record<string, { durationSeconds: number; chapters: { startSeconds: number }[] }> =
  timings;
export const expeditionExamples: readonly InquiryExample[] = manifest.items.map((item) => ({
  capabilityId: 'learning.worked-example',
  version: '1.0',
  id: item.id,
  lesson: item.lesson,
  title: item.title,
  summary: item.summary,
  attribution: manifest.attribution,
  videoUrl: `/history-live/expedition-examples/${item.id}.mp4`,
  posterUrl: `/history-live/expedition-examples/${item.id}-poster.png`,
  captionsUrl: `/history-live/expedition-examples/${item.id}.vtt`,
  durationSeconds: timing[item.id].durationSeconds,
  sourceIds: item.sourceIds,
  lookFors: item.lookFors,
  chapters: item.scenes.map((scene, index) => ({
    label: scene.label,
    text: scene.narration.join(' '),
    startSeconds: timing[item.id].chapters[index].startSeconds,
  })),
}));
