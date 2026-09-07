import type { DecisionSceneConfig } from '../../shared/project-intro/decision-scene.models';

const launchArt = '/narrative-studio/survival-island-history-launch-v1.jpg';
const launchMedia = (alt: string) => ({ image: launchArt, alt });

export const survivalIslandHistoryTeaser: DecisionSceneConfig = {
  type: 'decision-scene',
  id: 'survival-island-history-launch',
  version: '1.0.0',
  interaction: 'navigation',
  replayLabel: 'Choose another moment in history',
  kicker: 'Survival Island Story Lab · History sends a distress signal',
  headline: 'Three moments in history. One person whose fate is yours to write.',
  invitation:
    'The weather is turning. Somewhere beyond the next wave, a real historical moment is about to collide with a fictional life. Choose where your story begins.',
  sceneLabel: 'THE HORIZON IS CLOSING · CHOOSE YOUR HISTORICAL LAUNCH',
  sceneCaption:
    'Each option gives you real-world boundaries and one fictional person caught inside them. History sets the conditions. Your character’s choices create the adventure.',
  sceneBadge: { primary: '3 historical launches', secondary: '1 branching story' },
  transition: { style: 'spotlight', label: 'The storm crosses time' },
  media: launchMedia(
    'A fictional young survivor faces a stormy horizon with a Pacific voyaging canoe, an eighteenth-century ship, and an Antarctic lifeboat.',
  ),
  dialogue: [],
  prompt: 'Where does your survivor’s first impossible choice happen?',
  revealButton: 'Reveal this person’s first crisis',
  choices: [
    {
      id: 'pacific-wayfinding',
      thinking: {
        prompt: 'The stars vanish. What does your character do?',
        starter: 'My first story moment…',
        guide:
          'Invent a character and show an action using a real clue: waves, wind, birds, or sky. Show what they do, instead of explaining the whole adventure.',
      },
      label: 'The stars vanish',
      detail:
        'A fictional apprentice wayfinder must read waves, wind, birds, and sky after storm clouds hide the stars.',
      image: launchArt,
      imageAlt: 'A double-hulled Pacific voyaging canoe travels beneath a storm-darkened sky.',
      badge: 'PACIFIC VOYAGING · WAYFINDING',
      result: {
        title: 'The island is ahead. The sky refuses to say where.',
        text: 'The last guiding star disappears. A current pulls the canoe sideways, and the crew turns toward your fictional apprentice. They noticed one sign everyone else missed—but speaking now could save the voyage or destroy the crew’s trust.',
        evidence:
          'Historical anchor: Polynesian navigators used deeply learned observations of stars, waves, winds, clouds, birds, and other environmental signs. Portray that knowledge as expertise, not luck or magic.',
        surprise: 'THE OCEAN HAS BEEN LEAVING CLUES.',
        media: launchMedia(
          'Lightning reveals a Pacific voyaging canoe while a fictional apprentice watches the changing sea.',
        ),
        metrics: [
          { label: 'What disappears', value: 'The stars' },
          { label: 'What remains', value: 'Ocean signs' },
        ],
        source: {
          label: 'Smithsonian: Hōkūleʻa and Hawaiian wayfinding',
          url: 'https://folklife.si.edu/magazine/hokulea-hawaiian-wayfinding',
        },
      },
    },
    {
      id: 'selkirk-1709',
      thinking: {
        prompt: 'A ship appears. What does your character risk?',
        starter: 'My first story moment…',
        guide:
          'Write a fictional action within this historical setting. Give your character a choice with a cost. Save the complete plot for later.',
      },
      label: 'A fire on the deserted shore',
      detail:
        'On 2 February 1709, a fictional young deckhand approaches the island where Alexander Selkirk has survived alone.',
      image: launchArt,
      imageAlt:
        'An early-eighteenth-century sailing ship waits offshore as a storm reaches an island.',
      badge: 'MÁS A TIERRA · 1709',
      result: {
        title: 'A stranger runs toward the sea. The landing boat breaks loose.',
        text: 'Someone in goatskins is racing down the mountain. Then a wave takes the boat. Your fictional deckhand has seconds to protect the crew, reach the survivor, or recover the only object that proves why this expedition came here.',
        evidence:
          'Historical anchor: Alexander Selkirk was rescued on 2 February 1709 after four years and four months alone. That outcome stays true; your fictional character’s crisis unfolds around it.',
        surprise: 'RESCUE HAS BECOME A SURVIVAL STORY.',
        media: launchMedia(
          'A wooden sailing ship waits beyond rough surf while a fictional deckhand faces the island.',
        ),
        metrics: [
          { label: 'Known history', value: 'Selkirk is rescued' },
          { label: 'Your unknown', value: 'What it costs' },
        ],
        source: {
          label: 'Historic Environment Scotland: Selkirk’s rescue',
          url: 'https://blog.historicenvironment.scot/2020/01/incredible-voyages/',
        },
      },
    },
    {
      id: 'elephant-island-1916',
      thinking: {
        prompt: 'The boat is leaving. What does your character do?',
        starter: 'My first story moment…',
        guide:
          'Show one action in the cold, isolated setting. Your fictional character can choose, but cannot change the documented rescue events.',
      },
      label: 'The rescue boat disappears',
      detail:
        'On 24 April 1916, a fictional expedition assistant watches six men leave Elephant Island to seek rescue.',
      image: launchArt,
      imageAlt: 'A small lifeboat crosses icy water as a storm gathers over Elephant Island.',
      badge: 'ELEPHANT ISLAND · 1916',
      result: {
        title: 'The boat becomes a black dot. The ice begins to crack.',
        text: 'The James Caird vanishes into freezing spray. Behind your fictional character, the shelter starts to fail—and a hidden message could divide the stranded camp before help can ever return.',
        evidence:
          'Historical anchor: the Endurance crew reached Elephant Island, six men left on an 800-mile rescue journey, and all 28 real crew members ultimately survived. Your branches must protect those facts.',
        surprise: 'THE WAITING MAY BE THE HARDEST VOYAGE.',
        media: launchMedia(
          'A fictional expedition assistant watches a lifeboat leave an icebound island under storm clouds.',
        ),
        metrics: [
          { label: 'Rescue voyage', value: '800 miles' },
          { label: 'People who survived', value: 'All 28' },
        ],
        source: {
          label: 'Royal Museums Greenwich: Antarctic explorers',
          url: 'https://www.rmg.co.uk/stories/maritime-history/history-antarctic-explorers',
        },
      },
    },
  ],
  mission: {
    title: 'History fixes the horizon. You decide what the person does next.',
    invitation:
      'Carry your chosen moment into the Story Lab. Build a fictional protagonist, face them with consequential choices, and check every branch against the real historical anchor.',
    image: launchArt,
    imageAlt:
      'A lone fictional survivor faces three historically inspired island horizons beneath a dramatic storm.',
    deliverable: 'A playable branching historical-fiction story',
    steps: [
      'Anchor the opening in a researched historical moment.',
      'Write a fictional character whose choices reveal what they value.',
      'Playtest every path for consequence, continuity, and historical respect.',
    ],
    finishButton: 'Launch my historical adventure',
  },
};
