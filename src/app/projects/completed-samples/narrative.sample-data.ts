import { survivalIslandStoryLabConfig } from '../survival-island-story-lab/survival-island.config';
import type {
  NarrativeSceneDraft,
  PublishedNarrative,
} from '../../templates/narrative-studio/domain/narrative-studio.models';
import type { SampleGuide } from '../../shared/project-intro/completed-sample-guide';

const scene = (
  nodeId: string,
  title: string,
  text: string,
  choiceLabels: Readonly<Record<string, string>> = {},
): NarrativeSceneDraft => ({ nodeId, title, text, choiceLabels, revisions: [] });

export const survivalIslandSampleStory: PublishedNarrative = {
  nodes: [
    ...survivalIslandStoryLabConfig.nodes.map((node) => ({
      ...node,
      choices: node.choices.map((choice) => {
        if (choice.id === 'lagoon-signal') return { ...choice, nextNodeId: 'ending-return' };
        if (choice.id === 'cave-truth') return { ...choice, nextNodeId: 'ending-cave' };
        return choice;
      }),
    })),
    {
      ...survivalIslandStoryLabConfig.nodes.find((node) => node.id === 'ending-stay')!,
      id: 'ending-return',
      endingOutcome: 'death',
      mapLabel: 'Dead end · Swept out to sea',
      suggestedTitle: 'The Whistle Beneath the Waves',
    },
    {
      ...survivalIslandStoryLabConfig.nodes.find((node) => node.id === 'ending-stay')!,
      id: 'ending-cave',
      endingOutcome: 'death',
      mapLabel: 'Dead end · Trapped by the tide',
      suggestedTitle: 'The Rising Water',
    },
  ],
  authorNote:
    'I invented Tomás and his adventure around Selkirk’s real rescue. Two choices lead to the fictional character’s death: a dangerous solo crossing and a cave cut off by the tide. Other paths continue through the storm. Selkirk is rescued in every ending; the reader decides whether my fictional protagonist survives.',
  id: 'sample-fire-above-cove',
  publishedAt: '2026-09-05T18:00:00.000Z',
  title: 'The Fire Above the Cove',
  authorDisplayName: 'Maya R. · Fictional Grade 5 author',
  historicalSettingId: 'selkirk-1709',
  bible: {
    protagonist:
      'Tomás, a careful thirteen-year-old deckhand who notices small details but is afraid to speak up',
    immediateGoal: 'Keep the landing boat safe and help bring the island survivor aboard the Duke',
    innerFear: 'Tomás worries the older sailors will laugh if his idea is wrong',
    islandSecret: 'The wild-looking stranger has survived alone for more than four years',
    companion: 'Alexander Selkirk, the real survivor the crew has come to rescue',
    importantObject: 'A brass whistle Tomás uses to signal the ship',
    pointOfView: 'third',
    tone: 'adventure',
  },
  scenes: {
    shore: scene(
      'shore',
      'The Man in Goatskins',
      `On February 2, 1709, Tomás pulled an oar through the cold blue water. The ship Duke waited beyond the rocks. Ahead, smoke curled above the island of Más a Tierra.

“There!” cried a sailor.

A man in goatskins ran down the mountain. He waved both arms. He had been alone on the island for more than four years, but Tomás did not know that yet.

The landing boat struck the beach. A wave snapped the front rope out of Tomás’s hands. The boat spun sideways. At the same time, the stranger pointed toward the ridge and shouted a warning Tomás could not hear.

Tomás gripped his brass whistle. He had time to follow the stranger or save the boat’s rope. Not both.`,
      {
        'shore-high': 'Climb toward the stranger and learn what he is warning them about.',
        'shore-water': 'Chase the loose rope before the waves carry away the landing boat.',
      },
    ),
    ridge: scene(
      'ridge',
      'The Warning on the Ridge',
      `Tomás climbed over sharp stones. Wind pushed against his back. The stranger moved quickly, even without shoes.

At the top, Tomás saw two things. A narrow cave path led down to the sheltered cove. Farther uphill, rain had nearly put out a signal fire.

The stranger pointed at the cave. Then he pointed at the Duke and made a wide circle with his hand. Tomás understood. The next wave would block the beach. The rescue boat needed a safer landing place.

Tomás could hurry through the cave to show the sailors the cove. Or he could rebuild the fire so the ship would see where to send help.`,
      {
        'ridge-cave': 'Follow the stranger through the narrow cave path.',
        'ridge-signal': 'Stay on the ridge and rebuild the dying signal fire.',
      },
    ),
    lagoon: scene(
      'lagoon',
      'The Rope in the Water',
      `Tomás splashed into the cove. The loose rope slid past his fingers once. On his second try, he caught it and wrapped it around a black rock.

“Boat is safe!” he called. The wind stole his words.

Near the rock, Tomás found footprints. They were bare human feet, not animal tracks. They led toward a dark opening behind the cliff. Above him, a thin line of smoke bent in the wind.

The stranger had survived here somehow. The tracks might lead to him. Beyond the breaking waves, the Duke looked impossibly far away. Tomás could follow the footprints or take the boat back to the ship to ask for help. He tied the rope tight and chose his next move.`,
      {
        'lagoon-cave': 'Follow the bare footprints into the opening in the cliff.',
        'lagoon-signal': 'Take the boat back to the Duke and ask for help.',
      },
    ),
    cave: scene(
      'cave',
      'A Voice in the Dark',
      `The cave was dry inside. Tomás saw a clay cup, shells, and pieces of goatskin stacked with care. This was not an animal’s den. It was a home.

The stranger stepped into the light. His beard was long, but his eyes were bright.

“Ship?” he asked in a rough voice.

Tomás nodded. “Yes. We came from the Duke.”

Hope crossed the man’s face. Then thunder shook dust from the cave roof. He drew a map in the sand. The beach would flood, but a hidden cove could protect the boat.

Tomás did not know the man’s name. Still, the map matched the current he had seen. He raised his whistle and decided to trust what he had noticed.`,
      {
        'cave-eye': 'Trust the sand map and lead everyone toward the hidden cove.',
        'cave-truth': 'Wait inside the cave instead of following the warning about the tide.',
      },
    ),
    signal: scene(
      'signal',
      'Smoke Through the Rain',
      `Tomás reached the fire as rain began to fall. The wood hissed. He found dry grass beneath a flat stone and pushed it under the coals.

A small flame rose. Then another.

Tomás took off his red neck cloth and held it over the smoke. Three short signals. That was the pattern the Duke’s crew used for danger.

Far offshore, a lantern flashed three times.

They had seen him.

The stranger arrived and pointed toward a hidden cove. Tomás looked down at the rough water. If the next boat came to the open beach, it could break apart. His whistle felt cold against his lips. Should he hurry down to guide the boat, or keep the fire alive so the crew could find the island?`,
      {
        'signal-eye': 'Race to the hidden cove before the rescue boat reaches the rocks.',
        'signal-stay': 'Stay by the fire and protect the signal until help arrives.',
      },
    ),
    eye: scene(
      'eye',
      'Three Quiet Minutes',
      `For a moment, the rain stopped. The sea was still rough, but the wind became quiet.

The older sailors reached the cove. One of them stared at the stranger. He had sailed with him years before.

“Alexander Selkirk?” he asked.

The stranger smiled. At last, Tomás knew his name.

Another wave struck the rocks. The sailors needed a signal from above to guide the boat. Selkirk’s few belongings were still near the cave. A weather-stained notebook lay beside them.

The calm would not last. Tomás had to decide how he would help before the storm returned.`,
      {
        'eye-rescue': 'Climb above the cove and guide the boat with the brass whistle.',
        'eye-truth': 'Ask Selkirk before carrying his weather-stained notebook.',
      },
    ),
    'ending-return': scene(
      'ending-return',
      'The Whistle Beneath the Waves',
      `Tomás untied the boat before asking the sailors to help. He thought he could prove he was useful by reaching the Duke alone.

The current caught the bow. He pulled hard on one oar, but the boat turned sideways. A wave rose between him and the island.

Tomás reached for his brass whistle. Its thin note vanished beneath the wind. The next wave overturned the boat and swept him beyond the sailors’ reach. He could not make it back to shore. Tomás drowned.

Later that day, the other sailors brought Alexander Selkirk safely aboard the Duke. The real rescue still took place, but the fictional young deckhand never returned.

The empty place beside the galley stayed empty. His choice to cross alone had ended his story.`,
    ),
    'ending-cave': scene(
      'ending-cave',
      'The Rising Water',
      `Tomás decided the cave was safer than the storm. He waved the stranger ahead. “I’ll wait here!” he called.

At first, the stone walls kept out the wind. Then a thin ribbon of water crossed the sand map. Tomás moved his boots onto a rock. A second wave erased the map completely.

Now he understood the warning. The cave was part of the flooded passage.

He ran toward the entrance, but the tide had already covered the low opening. He blew his whistle until his breath failed. Outside, the storm swallowed the sound. The water kept rising, and Tomás drowned before anyone could reach him.

Alexander Selkirk reached the rescue crew by the higher path and was brought safely aboard the Duke. Tomás’s fictional adventure ended in the cave. Ignoring the warning had left him with no way out.`,
    ),
    'ending-rescue': scene(
      'ending-rescue',
      'Three Clear Notes',
      `Tomás climbed onto a high rock. The rescue boat looked tiny below him.

He saw a wave turning toward the cove. His stomach tightened. What if his signal was wrong?

Then he remembered the current below the rocks and the stranger’s warning. Tomás blew three clear notes and pointed east.

The sailors turned just in time. The wave lifted the boat instead of pushing it onto the rocks. Selkirk climbed aboard.

By sunset, everyone was safe on the Duke. Selkirk’s real rescue had finally come.

Tomás placed the whistle in his pocket. Courage, he decided, was not being sure. It was speaking when what you noticed might help someone.`,
    ),
    'ending-truth': scene(
      'ending-truth',
      'The Story Belonged to Him',
      `Tomás reached for the notebook, then stopped.

“May I carry this?” he asked.

Selkirk held the book for a moment. “Aye,” he said. “But keep it dry.”

Tomás tucked it beneath his coat. He wanted to open it and learn every island secret. Instead, he carried it closed.

The crew guided Selkirk into the boat. By sunset, he was safe aboard the Duke. Sailors crowded around him with questions, but Tomás waited.

He had helped rescue a man, not a treasure chest full of stories. When Selkirk was ready to speak, Tomás would listen. Until then, the story belonged to the person who had lived it.`,
    ),
    'ending-stay': scene(
      'ending-stay',
      'The Last Trip from Shore',
      `Tomás stayed by the fire. Every time rain flattened a flame, he fed it another handful of dry grass. He could hear the rescue crew calling below, but leaving now might put out their only visible guide.

The stranger crouched beside him and shielded the coals with a flat stone. Together they kept the smoke rising until a sailor climbed the ridge and waved them down. “Selkirk! We have a safe landing!” he called.

“You kept a fire ready all this time?” Tomás asked.

Selkirk looked at the mountain. “For four years and four months.”

The storm returned as they pushed away from shore. Tomás helped row until his arms shook. At sunset, Selkirk stepped onto the Duke at last.

Tomás had feared that staying behind would look weak. Now he knew that courage could be quiet. Sometimes it meant refusing to leave another person alone for one minute more.`,
    ),
  },
};

export const narrativeSampleGuide: SampleGuide = {
  title: 'The Fire Above the Cove',
  subtitle:
    'Play Maya’s branching story about a fictional deckhand caught inside Alexander Selkirk’s real 1709 rescue. Every path changes Tomás while protecting the historical outcome.',
  audience: 'Historical fiction · Grade 5 sample',
  duration: 'Eleven scenes · Five endings: two deaths and three survival outcomes',
  trail: [
    {
      label: 'Historical launch',
      title: 'A fictional child enters a real event.',
      text: 'Maya kept Selkirk’s rescue date and outcome fixed, then added Tomás as a fictional deckhand whose choices could branch safely around those facts.',
      evidence:
        'The player displays the historical anchor and accuracy boundary above every scene.',
    },
    {
      label: 'Character pressure',
      title: 'The outer storm tests an inner fear.',
      text: 'Tomás notices useful details but fears older sailors will laugh. Each choice asks whether he will speak, listen, help, or wait.',
      evidence:
        'His brass whistle changes from a simple object into a symbol of finding his voice.',
    },
    {
      label: 'Branching consequences',
      title: 'Different paths reveal different courage.',
      text: 'Readers may save the boat, follow Selkirk, rebuild the signal, or protect his belongings. Two paths end with Tomás’s death. Other paths continue and meet at the final decision.',
      evidence:
        'Five endings include a fatal solo crossing, a fatal rising tide, speaking up, respecting another person’s story, and staying to help.',
    },
    {
      label: 'Revision',
      title: 'Every ending protects the fact.',
      text: 'An early draft allowed Selkirk to remain on the island. Maya revised it because the real Selkirk was rescued on February 2, 1709.',
      evidence: 'All five endings leave Selkirk safely aboard the Duke.',
    },
  ],
  review: {
    strength:
      'The sample uses accessible sentences, concrete action, and repeated story details while clearly separating the fictional protagonist from the real historical person.',
    question:
      'Which details show Tomás changing, and how does that change connect to the choice you made?',
    revision:
      'The endings were rewritten so they differ emotionally while preserving the same documented rescue outcome.',
    assessment:
      'Look for a clear narrator, sequence, dialogue, sensory details, meaningful choices, historical boundaries, and an ending connected to the character’s fear.',
  },
};
