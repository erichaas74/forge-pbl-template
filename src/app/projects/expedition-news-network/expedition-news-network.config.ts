import type { HistoryLiveProjectConfig } from '../../templates/history-live/domain/history-live.models';
import { expeditionInquiry } from './expedition-news-network.inquiry';
import { expeditionSources } from './expedition-news-network.sources';

export const expeditionNewsNetworkConfig: HistoryLiveProjectConfig = {
  schemaVersion: '1.0',
  template: { id: 'history-live-broadcast', version: '1.1' },
  projectId: 'expedition-news-network',
  projectVersion: '1.0.0',
  title: 'Expedition News Network',
  event: 'Endurance: a changing mission',
  seasonLabel: 'Our first expedition',
  historicalWindow: 'Endurance expedition · 1914–1916',
  drivingQuestion: 'How can we report the expedition’s story clearly, fairly, and with evidence?',
  broadcastDateLabel: 'A present-day classroom report looking back',
  inquiry: expeditionInquiry,
  fieldStudio: {
    capabilityId: 'history-live.field-studio',
    version: '1.0',
    recordingGateId: 'e-b',
    finalGateId: 'e-c',
    networkSide: 'expedition',
    visualSourceIds: ['route', 'chronology', 'primary-preparation'],
  },
  networks: [
    {
      id: 'enn',
      side: 'expedition',
      name: 'Expedition News Network',
      shortName: 'ENN',
      monogram: 'ENN',
      deskLabel: 'Field newsroom',
      perspective: 'Modern classroom reporters examining historical evidence',
      accent: '#236e79',
      deskImageUrl: '/history-live/expedition-newsroom-v1.png',
      deskImageAlt:
        'Illustrated modern Antarctic newsroom with a wooden desk and a window overlooking sea ice.',
      deskLocationLabel: 'Imagined Antarctic learning studio',
    },
  ],
  beats: [
    {
      id: 'changing-mission',
      label: 'A changing mission',
      glyph: '↗',
      prompt: 'Explain how conditions changed the expedition’s plans and how people responded.',
    },
  ],
  storyLeads: [
    {
      id: 'endurance',
      side: 'expedition',
      beatId: 'changing-mission',
      headline: 'From crossing a continent to bringing people home',
      question: 'How did conditions and teamwork shape the Endurance story?',
      format: 'Historical Explainer',
      location: 'Weddell Sea, Elephant Island, and South Georgia',
      whyNow: 'Our class is learning to explain history with sources.',
      sourceIds: ['anchor', 'primary-preparation', 'chronology'],
    },
  ],
  assignmentScenes: [],
  sources: expeditionSources,
  seedSegments: [],
  reportFormats: ['Historical Explainer', 'Field Report'],
  reflectionPrompt: 'How did evidence and feedback change your report?',
  rubric: expeditionInquiry.targets.map((t) => ({
    id: t.id,
    label: t.standardId,
    expectation: t.prompt,
  })),
};
