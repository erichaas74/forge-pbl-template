import { historyLiveRevolutionaryWarConfig as config } from '../history-live-revolutionary-war/history-live-revolutionary-war.config';
import { createInitialHistoryLiveState } from '../../templates/history-live/core/history-live-state';
import type {
  HistoryLiveEnrollment,
  HistoryLiveRuntimeState,
  HistoryLiveVisualScene,
  HistoryLiveScriptBlock,
  BroadcastSegment,
} from '../../templates/history-live/domain/history-live.models';
import type { SampleGuide } from '../../shared/project-intro/completed-sample-guide';

export const broadcastSampleEnrollment: HistoryLiveEnrollment = {
  tenantId: 'completed-sample',
  classId: 'sample-newsroom',
  studentId: 'sample-riley',
  studentDisplayName: 'Riley Chen',
  teacherDisplayName: 'Sample producer',
  classLabel: 'Fictional classroom newsroom',
  mode: 'demo',
  role: 'student',
  permissions: [],
};
export function createBroadcastSample(): HistoryLiveRuntimeState {
  const initial = createInitialHistoryLiveState(config);
  const sources = ['source-declaration', 'source-king-proclamation', 'source-abigail'].map((id) =>
    config.sources.find((source) => source.id === id)!,
  );
  const captions = [
    'Congress presents independence as a justified separation. This is a public argument, not a neutral account of the conflict.',
    'The Crown frames armed resistance as rebellion. The same conflict is described through a different claim to authority.',
    'Abigail Adams challenges women’s position in new laws. Her letter raises a limit in our first headline: declaring rights does not prove everyone received them.',
  ];
  const scenes: HistoryLiveVisualScene[] = sources.map((source, index) => ({
    id: 'sample-scene-' + index,
    camera: index === 0 ? 'studio-wide' : 'media-wall',
    mediaType: 'quote',
    label: ['The public claim', 'The opposing frame', 'The missing voice'][index],
    sourceId: source.id,
    caption: captions[index],
  }));
  const script: HistoryLiveScriptBlock[] = captions.map((text, index) => ({
    id: 'sample-script-' + index,
    type: index === 2 ? 'REPORTER CLOSE' : 'SHOW SOURCE',
    claimId: 'sample-claim-' + index,
    text,
    sourceId: sources[index].id,
  }));
  const transcript =
    'This is Riley Chen for the Continental News Network, reporting as of July 31, 1776. Our question: whose freedom does independence promise? ' +
    captions.join(' ') +
    ' We cannot use this letter to speak for all women or assume its proposals became law. Our revised headline separates a political promise from the question of who could exercise those rights.';
  const segment: BroadcastSegment = {
    id: 'segment-sample-riley',
    reporter: 'Riley Chen',
    side: 'patriot',
    networkName: config.networks.find((n) => n.side === 'patriot')!.name,
    headline: 'Independence declared. Whose freedom follows?',
    desk: 'POLITICS · PHILADELPHIA',
    durationSeconds: 75,
    startLabel: '02:00',
    ready: true,
    visualLabel: 'Three documents, three perspectives',
    recordingPoster: {
      src: '/history-live/final-broadcast-video-stand-in.png',
      alt: 'A student history broadcast presented from a modern newsroom, with the Declaration of Independence, Abigail Adams, a map of the colonies, and a live transcript displayed behind the anchor.',
    },
    script,
    scenes,
    transcript,
    sample: true,
  };
  const reflection =
    'I first wrote that independence meant freedom for everyone. The producer asked who “everyone” included. Comparing the Declaration with Abigail Adams’s letter made that headline too broad. I kept the promise of rights but added a question about access to them. The Crown’s proclamation also showed why I must name whose viewpoint a claim represents.';
  return {
    ...initial,
    revision: 14,
    stage: 'showcase',
    role: 'student',
    selectedSide: 'patriot',
    sideLocked: true,
    pitch: {
      ...initial.pitch,
      leadId: 'lead-patriot-declaration',
      beatId: 'politics',
      headline: segment.headline,
      storyQuestion:
        'How did the promise of independence differ from who could exercise its rights?',
      whyAirtime: 'A declaration changes political ties while raising questions about rights.',
      reportFormat: 'Political Analysis',
      evidenceNeeded:
        'Compare the Declaration, Crown proclamation, and a letter challenging the reach of new laws.',
      initialPrediction: 'Independence meant freedom for everyone.',
      opposingChallenge:
        'The Crown disputes the legitimacy of separation, and Adams questions whose interests new laws will protect.',
      asOfDate: '1776-07-31',
      reportingMode: 'contemporary',
      status: 'approved',
    },
    savedSourceIds: sources.map((source) => source.id),
    selectedSourceId: sources[0].id,
    claims: sources.map((source, index) => ({
      id: 'sample-claim-' + index,
      text: captions[index],
      status: 'strongly-supported',
      supportingSourceIds: [source.id],
      evidence: [
        {
          sourceId: source.id,
          passage: source.excerpt,
          relationship: index === 2 ? 'challenges' : 'supports',
        },
      ],
      reasoning: captions[index],
      uncertainty: source.context,
    })),
    scriptBlocks: script,
    visualSequence: scenes,
    studentSegmentReady: true,
    packageStatus: 'approved',
    packageFeedback:
      'Sample producer clearance: the revised package attributes each viewpoint and avoids claiming that a promise reached everyone.',
    transcript,
    schedule: [segment],
    activeSegmentIndex: 0,
    showStatus: 'ready',
    reflection,
    reflectionHistory: [
      { timestamp: '2026-04-15T14:00:00.000Z', text: 'Independence meant freedom for everyone.' },
      { timestamp: '2026-04-16T14:00:00.000Z', text: reflection },
    ],
    reviewHistory: [
      {
        target: 'package',
        decision: 'revise',
        feedback:
          'Who does “everyone” include? Compare the promise of rights with a source that challenges access to them.',
        timestamp: '2026-04-15T14:30:00.000Z',
      },
      {
        target: 'package',
        decision: 'approved',
        feedback:
          'The headline now distinguishes a declared ideal from access to rights and identifies the limits of one private letter.',
        timestamp: '2026-04-16T14:30:00.000Z',
      },
    ],
  };
}
export const broadcastSampleGuide: SampleGuide = {
  title: 'History Live: The Finished Special Report',
  subtitle:
    'Watch short presentation demonstrations, then explore a separate fictional report package with its transcript, sources, and producer review.',
  videos: [
    {
      id: 'newsroom-report',
      title: 'Newsroom report',
      description:
        'A classroom presenter delivers a history report beside a screen showing Boston Harbor.',
      src: '/history-live/final-presentations/newsroom-report.mp4',
    },
    {
      id: 'competing-correspondents',
      title: 'Competing correspondents',
      description:
        'Two costumed correspondents appear side by side in a report set at Lexington Green.',
      src: '/history-live/final-presentations/competing-correspondents.mp4',
    },
    {
      id: 'social-report',
      title: 'Social report',
      description: 'A short demonstration of a historical report in a social media format.',
      src: '/history-live/final-presentations/social-report.mp4',
    },
    {
      id: 'presentation-reel',
      title: 'Presentation preview reel',
      description:
        'A silent montage of the classroom newsroom and paired correspondents, with descriptive captions.',
      src: '/history-live/final-presentations/presentation-reel.webm',
      captions: '/history-live/final-presentations/presentation-reel.vtt',
    },
  ],
  audience: 'History & media literacy · Grades 5–6',
  duration: 'Three scenes · 75-second report transcript',
  trail: [
    {
      label: 'Pitch',
      title: 'An eye-catching headline overreaches.',
      text: 'Riley begins with “Independence meant freedom for everyone.” The reporting date is July 31, 1776.',
      evidence: 'First reflection and completed pitch.',
    },
    {
      label: 'Evidence',
      title: 'Three documents complicate the story.',
      text: 'The Declaration, Crown proclamation, and Abigail Adams’s letter support different questions about rights and authority.',
      evidence: 'Native evidence scenes link directly to the cited documents.',
    },
    {
      label: 'Producer review',
      title: '“Who does everyone include?”',
      text: 'The sample producer requests a narrower claim and an attributed competing perspective.',
      evidence: 'Producer review history in the completed package record.',
    },
    {
      label: 'Final package',
      title: 'A better question goes on air.',
      text: 'The headline becomes “Independence declared. Whose freedom follows?” The close explains what one letter cannot establish.',
      evidence: 'Filed script, claim-source connections, and saved reflection.',
    },
  ],
  review: {
    strength:
      'The reporter attributes viewpoints, anchors the report to a date, and distinguishes a public claim from an established outcome.',
    question:
      'Which source made you change the headline, and what does that source still leave uncertain?',
    revision:
      'A universal claim becomes a narrower, evidence-based question with a competing perspective.',
    assessment:
      'Look for historical accuracy, corroboration, source limits, and clear communication. Producer clearance and broadcast completion are workflow states, not automatic mastery.',
  },
};
