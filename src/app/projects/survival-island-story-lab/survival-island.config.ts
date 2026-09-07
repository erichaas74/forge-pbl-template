import type { NarrativeStudioProjectConfig } from '../../templates/narrative-studio/domain/narrative-studio.models';

export const survivalIslandStoryLabConfig: NarrativeStudioProjectConfig = {
  schemaVersion: '1.0',
  template: { id: 'narrative-studio', version: '1.3' },
  authoringMode: 'student-branches',
  projectId: 'survival-island-story-lab',
  projectVersion: '1.2.0',
  title: 'Survival Island Story Lab',
  subtitle: 'Interactive Individual Narrative Studio',
  drivingQuestion:
    'How can a writer make every reader choice reveal character and change what happens next?',
  coachName: 'Storm Guide',
  coachPromise:
    'I ask one question at a time and remember your answers. Your ideas—not mine—decide what happens.',
  launchImage: '/narrative-studio/survival-island-history-launch-v1.jpg',
  launchImageAlt:
    'A fictional young survivor faces a stormy island horizon where a voyaging canoe, an eighteenth-century ship, and an Antarctic lifeboat suggest three historical settings.',
  historicalSettings: [
    {
      id: 'pacific-wayfinding',
      icon: '✦',
      eraLabel: 'Pacific voyaging · Before modern instruments',
      title: 'The stars vanish',
      historicalEvent: 'Traditional Polynesian wayfinding across the Pacific',
      overview:
        'Polynesian navigators crossed vast ocean distances by reading stars, waves, winds, clouds, birds, and other signs in the living environment.',
      fictionalRole:
        'A fictional apprentice wayfinder traveling with an experienced crew toward an island they cannot yet see.',
      survivalPressure:
        'Storm clouds erase the stars, a current pulls the canoe off course, and the crew turns to your character for one observation everyone else missed.',
      openingLine:
        'The last guiding star disappears—and your character realizes the ocean has been warning them all night.',
      accuracyBoundary:
        'Treat wayfinding as skilled, learned knowledge—not luck or magic. Keep your protagonist fictional and show respect for Pacific cultures.',
      sourceLabel: 'Smithsonian: Hōkūleʻa and Hawaiian wayfinding',
      sourceUrl: 'https://folklife.si.edu/magazine/hokulea-hawaiian-wayfinding',
    },
    {
      id: 'selkirk-1709',
      icon: '♨',
      eraLabel: 'Más a Tierra · 2 February 1709',
      title: 'A fire on the deserted shore',
      historicalEvent: 'The rescue of Alexander Selkirk after four years and four months alone',
      overview:
        'A British privateering expedition found Alexander Selkirk living on Más a Tierra, an island off Chile, after he had survived there for more than four years.',
      fictionalRole:
        'A fictional young deckhand sent ashore with the rescue boat as rough weather closes around the island.',
      survivalPressure:
        'The signal fire belongs to a stranger, the landing boat is being dragged toward rocks, and your character must decide whom—or what—to save first.',
      openingLine:
        'Someone is running down the mountain in goatskins, but the wave behind your character is already taking the boat.',
      accuracyBoundary:
        'Selkirk, his rescue date, and the expedition are fixed history. Invent your character’s private choices around those facts without replacing the real people.',
      sourceLabel: 'Historic Environment Scotland: Selkirk’s rescue',
      sourceUrl: 'https://blog.historicenvironment.scot/2020/01/incredible-voyages/',
    },
    {
      id: 'elephant-island-1916',
      icon: '❄',
      eraLabel: 'Elephant Island · 24 April 1916',
      title: 'The rescue boat disappears',
      historicalEvent: 'Shackleton’s crew stranded on Elephant Island',
      overview:
        'After the Endurance was lost, its crew reached Elephant Island. Six men left in the James Caird on an 800-mile rescue journey while the others waited.',
      fictionalRole:
        'A fictional young expedition assistant among the people left on the icebound island.',
      survivalPressure:
        'The rescue boat vanishes into freezing spray, a shelter wall starts to fail, and your character discovers a message that could divide the camp.',
      openingLine:
        'By the time the James Caird becomes a black dot, the ice beneath your character’s boots has begun to crack.',
      accuracyBoundary:
        'All 28 real Endurance crew members survived. Keep that outcome and the real people intact while branching your fictional character’s experience.',
      sourceLabel: 'Royal Museums Greenwich: Antarctic explorers',
      sourceUrl: 'https://www.rmg.co.uk/stories/maritime-history/history-antarctic-explorers',
    },
  ],
  planningQuestions: [
    {
      id: 'person',
      bibleField: 'protagonist',
      prompt:
        'Who is the fictional person you want us to follow? Describe them in your own words. What is one thing they are good at—and one thing they still need to learn?',
    },
    {
      id: 'want',
      bibleField: 'immediateGoal',
      prompt:
        'What does this person want right now, before the larger adventure begins? Explain why it matters to them personally.',
    },
    {
      id: 'fear',
      bibleField: 'innerFear',
      prompt:
        'What worry, fear, or mistaken belief could make their next choice difficult? Explain how it might affect what they do.',
    },
    {
      id: 'relationship',
      bibleField: 'companion',
      prompt:
        'Who else matters in this moment? Describe what this person wants and why the two characters may not agree.',
    },
    {
      id: 'object',
      bibleField: 'importantObject',
      prompt:
        'Choose one object that could become useful, costly, or meaningful. Where did it come from, and why would your character hate to lose it?',
    },
    {
      id: 'unknown',
      bibleField: 'islandSecret',
      prompt:
        'What truth, mystery, or unanswered question will pull the character deeper into the story? It can be completely different from the example spark.',
    },
  ],
  storyBiblePrompts: {
    protagonist: 'Who will we follow? Include one strength and something they need to learn.',
    immediateGoal: 'What do they want right now, and why does it matter to them?',
    innerFear: 'What fear, flaw, or false belief could shape their choices?',
    islandSecret: 'What truth, mystery, or unanswered question pulls them deeper into the story?',
    companion: 'Who else matters, what do they want, and why might they disagree?',
    importantObject: 'What object could become useful, costly, meaningful, or all three?',
    pointOfView: 'Choose who tells the story.',
    tone: 'Choose the emotional weather of the story.',
  },
  stormStages: [
    {
      id: 'warning',
      label: 'Opening change',
      pressure: 'The writer decides what interrupts the character’s plan.',
      authorPrompt: 'What changes, and why does your character have to respond now?',
    },
    {
      id: 'squall',
      label: 'New complication',
      pressure: 'The writer decides what makes the first choice harder than expected.',
      authorPrompt: 'What new fact, feeling, or problem changes the meaning of the path?',
    },
    {
      id: 'flood',
      label: 'A cost appears',
      pressure: 'The writer decides what the character may lose by continuing.',
      authorPrompt: 'What does this attempt cost, even if it works?',
    },
    {
      id: 'eye',
      label: 'Final decision',
      pressure: 'The writer decides which values come into conflict.',
      authorPrompt: 'What can the character protect, and what must each option risk?',
    },
    {
      id: 'landfall',
      label: 'Consequences',
      pressure: 'The writer decides how earlier choices change the ending.',
      authorPrompt: 'What earlier detail returns, and what does it mean now?',
    },
  ],
  startNodeId: 'shore',
  nodes: [
    {
      id: 'shore',
      kind: 'scene',
      mapLabel: 'Opening Moment',
      suggestedTitle: 'Something Changes',
      purpose: 'Introduce the person, what they want, and the change that makes action necessary.',
      craftPrompt: 'Begin inside a change you invented. Let one concrete detail make it feel real.',
      choiceQuestion: 'What do you do next?',
      stormStageId: 'warning',
      choices: [
        { id: 'shore-high', nextNodeId: 'ridge', prompt: 'Build a fire to signal for help' },
        { id: 'shore-water', nextNodeId: 'lagoon', prompt: 'Look for water before moving on' },
      ],
    },
    {
      id: 'ridge',
      kind: 'scene',
      mapLabel: 'Knowledge Path',
      suggestedTitle: 'What They Learn',
      purpose: 'Let the character gain information that changes what they think they should do.',
      craftPrompt: 'What do they learn, and why does it create a harder question?',
      choiceQuestion: 'What do you do next?',
      stormStageId: 'squall',
      choices: [
        { id: 'ridge-cave', nextNodeId: 'cave', prompt: 'Follow the new clue' },
        { id: 'ridge-signal', nextNodeId: 'signal', prompt: 'Try a risky signal' },
      ],
    },
    {
      id: 'lagoon',
      kind: 'scene',
      mapLabel: 'Resource Path',
      suggestedTitle: 'What They Find',
      purpose:
        'Let the character find something useful, then reveal why using it will not be simple.',
      craftPrompt: 'What do they find, and what unexpected problem comes with it?',
      choiceQuestion: 'What do you do next?',
      stormStageId: 'squall',
      choices: [
        { id: 'lagoon-cave', nextNodeId: 'cave', prompt: 'Investigate what you found' },
        { id: 'lagoon-signal', nextNodeId: 'signal', prompt: 'Use it to call for help' },
      ],
    },
    {
      id: 'cave',
      kind: 'scene',
      mapLabel: 'Discovery',
      suggestedTitle: 'The Hidden Truth',
      purpose: 'Reveal part of the unknown truth and change what the character believes.',
      craftPrompt: 'Answer one reader question, then let the answer create a better question.',
      choiceQuestion: 'What do you do next?',
      stormStageId: 'flood',
      choices: [
        { id: 'cave-eye', nextNodeId: 'eye', prompt: 'Carry the discovery into the storm' },
        {
          id: 'cave-truth',
          nextNodeId: 'ending-truth',
          prompt: 'Protect the truth and end the search',
        },
      ],
    },
    {
      id: 'signal',
      kind: 'scene',
      mapLabel: 'Risky Attempt',
      suggestedTitle: 'The Plan Meets Trouble',
      purpose: 'Let the character try an idea and discover a consequence they did not expect.',
      craftPrompt: 'Whether the attempt works or fails, what does it reveal about the character?',
      choiceQuestion: 'What do you do next?',
      stormStageId: 'flood',
      choices: [
        { id: 'signal-eye', nextNodeId: 'eye', prompt: 'Risk one more attempt' },
        {
          id: 'signal-stay',
          nextNodeId: 'ending-stay',
          prompt: 'Stay and protect what matters',
        },
      ],
    },
    {
      id: 'eye',
      kind: 'scene',
      mapLabel: 'Final Decision',
      suggestedTitle: 'The Choice That Matters Most',
      purpose: 'Bring the branches together and force a choice between competing values.',
      craftPrompt:
        'Use the values you described in the chat. Let every option protect and risk something.',
      choiceQuestion: 'What do you do next?',
      stormStageId: 'eye',
      choices: [
        { id: 'eye-rescue', nextNodeId: 'ending-rescue', prompt: 'Act now and seek rescue' },
        { id: 'eye-truth', nextNodeId: 'ending-truth', prompt: 'Reveal the truth before leaving' },
      ],
    },
    {
      id: 'ending-rescue',
      kind: 'ending',
      mapLabel: 'Action Ending',
      suggestedTitle: 'What Their Action Changes',
      purpose: 'Resolve the final action and show what it costs or protects.',
      craftPrompt: 'Show how the person is different because of choices the reader made.',
      stormStageId: 'landfall',
      choices: [],
    },
    {
      id: 'ending-truth',
      kind: 'ending',
      mapLabel: 'Truth Ending',
      suggestedTitle: 'What the Truth Changes',
      purpose: 'Resolve the central question and make the answer matter to the person’s future.',
      craftPrompt: 'Connect the revelation to an earlier clue so it feels surprising but earned.',
      stormStageId: 'landfall',
      choices: [],
    },
    {
      id: 'ending-stay',
      kind: 'ending',
      mapLabel: 'Responsibility Ending',
      suggestedTitle: 'What They Choose to Protect',
      purpose: 'Resolve a choice to take responsibility and show what the person now protects.',
      craftPrompt: 'End on a concrete image from your story that now carries a larger meaning.',
      stormStageId: 'landfall',
      choices: [],
    },
  ],
  rubric: [
    {
      id: 'character',
      label: 'Character under pressure',
      expectation: 'The protagonist’s goals, fears, and choices shape what happens.',
    },
    {
      id: 'craft',
      label: 'Narrative craft',
      expectation:
        'Description, dialogue, pacing, and point of view create a deliberate experience.',
    },
    {
      id: 'branching',
      label: 'Meaningful consequences',
      expectation: 'Reader choices offer different costs and produce visible later consequences.',
    },
    {
      id: 'revision',
      label: 'Revision and continuity',
      expectation:
        'Details remain consistent across paths, and playtesting leads to purposeful revisions.',
    },
  ],
};
