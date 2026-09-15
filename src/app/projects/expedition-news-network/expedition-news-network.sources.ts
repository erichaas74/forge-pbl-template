import type { HistoryLiveSource } from '../../templates/history-live/domain/history-live.models';

const south = 'https://www.gutenberg.org/files/5199/5199-h/5199-h.htm';
const museum = 'https://www.spri.cam.ac.uk/museum/exhibitions/endurance/essay.pdf';
const timeline = 'https://www.rmg.co.uk/stories/maritime-history/history-antarctic-explorers';

/** Original classroom passages, clearly distinguished from primary-source quotations. */
export const expeditionSources: readonly HistoryLiveSource[] = [
  {
    id: 'anchor',
    title: 'When an expedition changes its plan',
    creator: 'Forge classroom source packet',
    dateLabel: 'Written for this project · about 1914–1916',
    sourceType: 'Classroom reading · synthesis',
    perspective: 'retrospective',
    excerptKind: 'summary',
    primary: false,
    tags: ['central ideas', 'adaptation', 'teamwork'],
    excerpt: `In 1914, Ernest Shackleton set out with an ambitious goal: to cross Antarctica. His ship, Endurance, carried people, equipment, and supplies toward the Weddell Sea. But a planned route is not a promise. Ice trapped the ship before the crossing could begin. As the ice moved, it carried the ship with it. The explorers could not simply steer toward their original destination.

The expedition had to change its work. Scientists adjusted their research to the conditions around the ship. Other members maintained equipment and supplies. When pressure from the ice damaged Endurance, saving people became more urgent than crossing a continent. The party left the ship and lived on the ice. Their smaller boats would become essential for the next part of their journey.

Changing plans also required people to work together. Moving supplies, preparing boats, and helping tired companions were separate jobs with a shared purpose. In his later account, Shackleton describes stores and equipment being kept ready to move. Preparation could not control the ice, but it could help the group respond when conditions changed.

In April 1916, the party reached Elephant Island in three small boats. Six men then sailed the James Caird toward South Georgia to seek help for those who remained. All 28 members of the Endurance party eventually survived. This statement concerns that party; the wider expedition also included a separate Ross Sea party, which suffered losses.

A reporter can connect the events without pretending the original mission succeeded. The planned crossing was not completed. The rescue was a different achievement. To explain this story fairly, use evidence about both changing conditions and the work of many people.`,
    context:
      'Original classroom synthesis based on South, chapters I–IX, and the Scott Polar Research Institute exhibition essay. It is a reading text, not a quotation or an eyewitness account. The newsroom illustration is decorative.',
    citation:
      'Forge classroom synthesis. Basis: Ernest Shackleton, South (1919), chapters I–IX; Beau Riffenburgh, The Imperial Trans-Antarctic Expedition, Scott Polar Research Institute.',
    url: south,
  },
  {
    id: 'primary-preparation',
    title: 'Shackleton remembers preparing to leave',
    creator: 'Ernest Shackleton',
    dateLabel: '1919 account of the 1915 journey',
    sourceType: 'Primary source · memoir',
    perspective: 'expedition leader',
    excerptKind: 'quotation',
    primary: true,
    tags: ['quotation', 'preparation', 'viewpoint'],
    excerpt:
      '“Stores, dogs, sledges, and equipment were ready to be moved from the ship at a moment’s notice.”',
    context:
      'Exact sentence from South, chapter IV. Shackleton wrote after returning. He describes preparations as pressure threatened the ship. A leader’s account can explain his decisions, but it cannot represent every person’s thoughts. Surrounding original text includes difficult survival details; teachers should select further excerpts before assigning them.',
    citation:
      'Ernest Shackleton, South: The Story of Shackleton’s Last Expedition, 1914–1917 (1919), chapter IV, “Loss of the Endurance,” entry for October 25, 1915. Public-domain text, Project Gutenberg ebook 5199.',
    url: south,
  },
  {
    id: 'chronology',
    title: 'A short expedition timeline',
    creator: 'Forge, using Royal Museums Greenwich and SPRI',
    dateLabel: '1914–1916 · later historical summary',
    sourceType: 'Secondary source · timeline',
    perspective: 'retrospective',
    excerptKind: 'summary',
    primary: false,
    tags: ['sequence', 'dates'],
    excerpt: `1914 — Endurance departs Britain. The aim is to cross Antarctica.
1915 — Ice holds the ship in the Weddell Sea. The party abandons the damaged ship in October; it sinks in November.
April 1916 — The party reaches Elephant Island. Six men leave in the James Caird to seek help at South Georgia.
August 1916 — The remaining Endurance party is rescued from Elephant Island.

Sequence helps us check when events happened. It does not, by itself, explain every decision or prove what a person felt.`,
    context:
      'Teacher-authored summary. Compare it with the first-person account before explaining a cause. Dates refer to the Endurance party.',
    citation:
      'Royal Museums Greenwich, History of Antarctic explorers; Beau Riffenburgh, SPRI expedition essay.',
    url: timeline,
  },
  {
    id: 'archive-photo',
    title: 'A photograph is another kind of evidence',
    creator: 'Frank Hurley; cataloged by Royal Museums Greenwich',
    dateLabel: 'Endurance expedition · archive record',
    sourceType: 'Primary-source photograph · catalog reference',
    perspective: 'expedition photographer',
    excerptKind: 'summary',
    primary: true,
    tags: ['visual evidence', 'source limits'],
    excerpt:
      'The museum record is titled “Endurance heeled to port by the ice.” Open the archive to examine the photograph. Describe only what you can observe before inferring what happened. A photograph can show a ship’s position and surrounding ice at one moment. It cannot tell us everything that happened before or afterward, or reveal the thoughts of every person on board.',
    context:
      'This text is a classroom description and observation prompt, not a transcript of the photograph. The original image remains on the museum website; its reproduction rights have not been assumed.',
    citation:
      'Royal Museums Greenwich, collection object “Endurance heeled to port by the ice,” Frank Hurley, object 538261.',
    url: 'https://www.rmg.co.uk/collections/objects/rmgc-object-538261',
  },
  {
    id: 'route',
    title: 'From trapped ship to a call for help',
    creator: 'Forge classroom diagram',
    dateLabel: 'Simplified route · 1915–1916',
    sourceType: 'Classroom diagram · not to scale',
    perspective: 'retrospective',
    excerptKind: 'summary',
    primary: false,
    tags: ['route', 'purposeful media'],
    imageUrl: '/history-live/expedition-route.svg',
    imageAlt:
      'Schematic sequence: Weddell Sea ice camp, then Elephant Island in three boats, then six people sail the James Caird to South Georgia. Not to scale.',
    excerpt:
      'Weddell Sea → Elephant Island → South Georgia. The first journey used three small boats. The second carried six people in the James Caird to seek help. The arrows show a sequence of destinations, not exact paths, distances, or compass directions. Use this diagram to explain the change in the party’s goal.',
    context:
      'Original classroom schematic based on the expedition account and museum chronology. A diagram simplifies information; explain what it leaves out.',
    citation:
      'Forge route schematic, based on Shackleton, South, chapters VIII–IX; Royal Museums Greenwich Antarctic explorer chronology.',
    url: south,
  },
  {
    id: 'fresh-reading',
    title: 'Preparing a small boat for a large task',
    creator: 'Forge classroom source packet',
    dateLabel: 'Fresh reading · about April 1916',
    sourceType: 'Independent reading passage · synthesis',
    perspective: 'retrospective',
    excerptKind: 'summary',
    primary: false,
    tags: ['independent check', 'central ideas'],
    excerpt: `On Elephant Island, reaching land had solved one problem without solving every problem. The party was away from the shifting ice, but it still needed a way to get help. Shackleton decided that a small group would attempt the voyage to South Georgia in the James Caird. The decision linked two groups: those making the journey and those waiting for rescue.

The boat needed preparation before departure. The carpenter, Harry McNish, worked on making it more suitable for the voyage. Supplies had to fit into limited space. Frank Worsley’s navigation would help the crew find their destination across open water. One person’s decision was not enough to perform all these tasks. Different skills contributed to a shared purpose.

The James Caird story shows why a useful report needs more than a list of places. A reporter can explain how the need for help led to a difficult journey, and how preparation connected the work of several people. A careful report also distinguishes a decision from its result: planning for safety could reduce some risks, but could not make the voyage certain to succeed.`,
    context:
      'Original classroom passage based on South, chapter IX, “The Boat Journey.” Use for the lesson 7 check after practicing on the anchor article. Do not substitute a timeline-only answer for two central ideas and a relationship.',
    citation:
      'Forge classroom synthesis of Ernest Shackleton, South (1919), chapter IX, “The Boat Journey.” McNish is spelled McNeish in Shackleton’s account.',
    url: south,
  },
];
