import type { NarrativePreviewWeek } from '../../templates/narrative-studio/domain/narrative-preview.models';

type Scene = NarrativePreviewWeek['scenes'][number];
function scene(
  id: string, title: string, starterText: string,
  choices: readonly (readonly [string, string])[], craftPrompt: string,
  stormStageId = 'warning',
): Scene {
  return {
    id, mapLabel: title, suggestedTitle: title, starterText,
    kind: choices.length ? 'scene' : 'ending',
    ...(choices.length ? {} : { endingOutcome: 'survival' as const }),
    purpose: craftPrompt, craftPrompt, stormStageId,
    ...(choices.length ? { choiceQuestion: 'What will you do?' } : {}),
    choices: choices.map(([nextNodeId, prompt], index) => ({ id: `${id}-${index + 1}`, nextNodeId, prompt })),
  };
}

export const survivalIslandPreviewWeeks: readonly NarrativePreviewWeek[] = [
  {
    id: 'shore-voices', week: 1, title: 'A voice on the shore',
    setting: 'A fictional island landing. Build a voice, a goal, and a decision the reader can feel.',
    startNodeId: 'shore',
    sessions: [
      { title: 'Write the opening', tool: 'write', nodeId: 'shore', mission: 'Replace the sample opening with your own. Put the reader inside one sound, one movement, and one urgent wish.', product: 'An opening scene with a clear viewpoint and character goal.' },
      { title: 'Let the characters disagree', tool: 'write', nodeId: 'shelter', mission: 'Give the two characters distinct voices. Rewrite their dialogue and offer two decisions that reveal what each values.', product: 'A dialogue scene and two reader choices for a writing circle.' },
    ],
    questions: ['What does your narrator notice that another character might miss?', 'Which action reveals the character’s goal?', 'How does the dialogue make the two choices feel different?'],
    evidence: ['Opening prose and point of view.', 'Dialogue, choice labels, and the scene reached by each choice.'],
    controls: ['Select the writing scene and starting detail.', 'Adjust viewpoint, tone, and character pressure.', 'Offer a shorter or more complex sample and change reader-choice prompts.'],
    scenes: [
      scene('shore', 'Salt on the wind', 'Salt scratched my lips. I dragged the red bag above the foam and listened for another voice. “Nia?” Only the pebbles answered. Then a whistle came from the trees, and a second whistle rose from the ridge. I could not follow both.', [['shelter', 'Follow the whistle in the trees'], ['ridge', 'Climb toward the ridge']], 'Show a goal through a concrete action. Keep the same narrator throughout.'),
      scene('shelter', 'Two kinds of courage', '“We should stay where they can find us,” Nia said. She tightened her grip on the red bag. “And wait until we are soaked?” I pointed to a roof of tangled branches. Nia shook her head. “That roof cannot see a rescue boat.”', [['warm', 'Build shelter together'], ['watch', 'Take turns watching the shore']], 'Replace the dialogue. Let each speaker want something reasonable.', 'squall'),
      scene('ridge', 'The answering whistle', 'At the top, I found a hollow reed wedged between two stones. Wind made the sound I had followed. Below me, Nia waved both arms. I could see her shelter, and beyond it a strip of bright water where a boat might pass.', [['watch', 'Return and organize a lookout'], ['signal', 'Make a marker on the ridge']], 'Let a discovery change what the character believes.', 'squall'),
      scene('warm', 'A roof for two', 'We wove the last branch into place as rain reached the beach. Nia set the red bag between us and laughed at our crooked roof. I had wanted to be the brave one. Now I was glad we had been brave in different ways.', [], 'Echo an opening detail with a new meaning.', 'landfall'),
      scene('watch', 'Your turn, my turn', 'I watched while Nia rested. Later she tapped my shoulder and took my place. The horizon was still empty, but we had a plan that belonged to both of us. I tucked the whistle reed into the red bag for tomorrow.', [], 'Show how the relationship changes.', 'landfall'),
      scene('signal', 'A mark above the rain', 'The arrow of pale stones pointed toward our beach. When I climbed down, Nia had left a dry place for me beneath the branches. From the shelter we could see our marker on the ridge. Neither of us had solved everything alone.', [], 'Resolve the immediate decision without solving every problem.', 'landfall'),
    ],
  },
  {
    id: 'river-cost', week: 2, title: 'The price of a choice',
    setting: 'A flooded ravine divides the island. Change the routes, then make each outcome follow from a decision.',
    startNodeId: 'crossing',
    sessions: [
      { title: 'Build the consequence map', tool: 'map', nodeId: 'crossing', mission: 'Explore the routes. Select a scene to rewrite it, turn a path into an ending, or extend an ending with two new branches.', product: 'A branching map with visibly different costs and consequences.' },
      { title: 'Try the other route', tool: 'read', nodeId: 'crossing', mission: 'Read both routes through the crossing. Return to writing wherever a consequence does not follow from its choice.', product: 'Two playable outcomes for the writing circle to compare.' },
    ],
    questions: ['What does each option protect, and what does it risk?', 'Could the reader predict the kind of consequence without knowing the ending?', 'Does the outcome actually depend on the chosen route?'],
    evidence: ['Graph structure and connected scenes.', 'Choice wording, supply details, and paths tried.'],
    controls: ['Change the crossing problem, available supplies, or time pressure.', 'Add, end, and restore branches; select a destination.', 'Start a reader test on any available scene.'],
    scenes: [
      scene('crossing', 'The broken bridge', 'The river had taken the middle of the bridge. On the far bank, a silver tarp flashed between the trees: our shelter supplies. I had a rope and one dry meal. Nia watched the water rise against a painted mark on the post.', [['rope', 'Spend the rope on a crossing line'], ['detour', 'Keep the rope and take the long trail']], 'Make the resources and the risk concrete.'),
      scene('rope', 'One rope, two jobs', 'The crossing line held. Halfway across, I saw our supply box turning in an eddy below. I could lower the rope to hook it, but then Nia would have no line to follow. Her hand was already reaching for the first plank.', [['together', 'Keep the crossing line for Nia'], ['supplies', 'Retrieve the box before it drifts away']], 'Show a real tradeoff with no secret correct answer.', 'flood'),
      scene('detour', 'The long way', 'By dusk the trail had climbed above the flood. We still had the rope, but our dry meal was gone. Below us, the silver tarp shone through the trees. A steep shortcut led down; the marked trail continued into the dark.', [['late', 'Stay on the marked trail'], ['shortcut', 'Use the rope on the shortcut']], 'Make the long route cost something different.', 'squall'),
      scene('together', 'Across together', 'Nia reached the bank as the box escaped the eddy and vanished. We had lost the supplies, but we could carry the fallen branches together. Our first shelter was small. We tied the useless scraps into a flag and promised to search at daylight.', [], 'Connect the missing resource to the earlier choice.', 'landfall'),
      scene('supplies', 'A box between banks', 'I caught the box and dragged it onto the gravel. Across the river, Nia called my name. We had blankets now, but we were on opposite banks. I held one bright blanket high while she found a dry ledge to wait for morning.', [], 'Show the cost even when the immediate plan works.', 'landfall'),
      scene('late', 'Shelter after dark', 'We reached the tarp after the last light faded. We were hungry and tired, but the marked trail had kept us above the flood. I hung the rope beside our doorway. Tomorrow it could help us carry supplies instead of crossing a river.', [], 'Pay off the route’s time cost.', 'landfall'),
      scene('shortcut', 'A shorter way down', 'The rope brought us safely to the trees beside the tarp. Its rough end frayed against the rock, too short now for another crossing. We had shelter before dark. I coiled what remained and wondered what tomorrow would ask us to give up.', [], 'Keep the gain and the cost visible.', 'landfall'),
    ],
  },
  {
    id: 'lantern-repair', week: 3, title: 'The missing lantern',
    setting: 'A continuity puzzle: two trails meet at one cave. The sample deliberately forgets where its lantern went.',
    startNodeId: 'camp',
    sessions: [
      { title: 'Repair the shared scene', tool: 'revise', nodeId: 'cave', mission: 'Compare the sample with your draft. Trace both arrivals at the cave, then repair the lantern detail so either route makes sense.', product: 'A revised scene that works after two different routes.' },
      { title: 'Test every ending', tool: 'read', nodeId: 'camp', mission: 'Try both trails and the alternate endings. Use the path strip to revisit a scene and adjust an inconsistent detail.', product: 'A playable continuity repair and alternate endings for reader testing.' },
    ],
    questions: ['Who has the lantern on each route?', 'What must be true whenever the reader reaches the shared scene?', 'Which change fixes continuity while keeping tension?'],
    evidence: ['Original sample beside the revised prose.', 'Both incoming paths, object references, and ending details.'],
    controls: ['Choose the continuity fault and convergence point.', 'Change clue order, object ownership, or pacing.', 'Select a test route and compare it with another ending.'],
    scenes: [
      scene('camp', 'One lantern left', 'We had one lantern and two trails to the cave. Nia offered to check the ridge while I explored the shore. “Whoever reaches the cave first should wait,” she said. I checked the lantern latch and chose which trail to take.', [['ridge', 'Give Nia the lantern and take the shore'], ['tide', 'Carry the lantern along the ridge']], 'Establish who owns the important object.'),
      scene('ridge', 'An empty hand', 'Nia climbed away with our only lantern. I walked the shore by the light of the moon. At the cave entrance I could see no footprints. I was first, and my hands were empty. From inside came a faint tapping.', [['cave', 'Enter the cave before Nia arrives'], ['wait', 'Wait outside for Nia']], 'Track the lantern through this route.', 'squall'),
      scene('tide', 'A light in the rain', 'I carried the lantern up the ridge. Rain hissed on its glass, but the flame held. The trail ended beside the cave. I lifted the light to read a mark on the stone. Below me, Nia was still crossing the shore.', [['cave', 'Follow the tapping into the cave'], ['wait', 'Wait at the entrance']], 'Keep this route consistent with the shared scene.', 'squall'),
      scene('cave', 'The impossible light', 'I raised my lantern and the chamber glowed gold. The tapping came from a loose board in the wind. Under it lay a dry map. I could take the map back to camp, or leave a mark to show Nia where I had gone.', [['map', 'Carry the map back to camp'], ['mark', 'Mark the entrance and wait']], 'Deliberate sample fault: how can this scene work when Nia has the only lantern?', 'flood'),
      scene('wait', 'A light shared', 'We met beneath the cave’s stone lip. Together we held the lantern over the marks on the wall. The waiting had cost us daylight, but now neither of us had to guess where the other had gone. We entered side by side.', [], 'Resolve the object and relationship threads.', 'landfall'),
      scene('map', 'The path on paper', 'At camp I spread the dry map on a flat stone. When Nia arrived, I showed her the trail I had found. She pointed to a symbol I had missed. The map gave us a direction, but only our two journeys made it useful.', [], 'Check whether the ending fits both arrivals.', 'landfall'),
      scene('mark', 'A sign to follow', 'I arranged three stones at the entrance and waited where the moon could find me. Nia spotted the sign before she heard my voice. We had made separate journeys, but the next part of the map would be a journey together.', [], 'Bring back a detail that both paths support.', 'landfall'),
    ],
  },
  {
    id: 'signal-final', week: 4, title: 'The last signal',
    setting: 'A complete fictional rescue story. Shape a climax, change the endings, and let someone play the result.',
    startNodeId: 'beacon',
    sessions: [
      { title: 'Shape the final decision', tool: 'write', nodeId: 'climax', mission: 'Rewrite the final decision. Make its alternatives call back to earlier details, then edit or extend the endings.', product: 'A revised climax and endings in an individual branching story.' },
      { title: 'Play the story', tool: 'read', nodeId: 'beacon', mission: 'Hand over the reader view for a local demonstration. Try another route, then return to the writer to make changes.', product: 'A playable story demonstration for the writing circle.' },
    ],
    questions: ['Which early detail makes the final choice feel earned?', 'What changes in the character across each route?', 'How would a new constraint change the ending without breaking earlier scenes?'],
    evidence: ['Opening-to-ending paths and their consequences.', 'Climax wording, ending images, and revisions made after reading.'],
    controls: ['Control the whole draft graph and scene selection.', 'Change the final dilemma, weather pressure, or tone.', 'Choose alternate endings and reader starting points.'],
    scenes: [
      scene('beacon', 'A sail beyond the reef', 'For three days the old signal tower had been a dark tooth above our camp. This morning a sail appeared beyond the reef. Nia held up the red cloth we had saved from the boat. “They need to see us before the rain comes,” she said.', [['tower', 'Climb the tower with the red cloth'], ['beach', 'Build a signal on the beach']], 'Plant an object that matters again in the ending.'),
      scene('tower', 'The missing rung', 'A rung snapped under my boot. Nia braced the ladder below me while the red cloth tugged at my wrist. Above us, the platform faced the distant sail. The broken rung could become a splint for the ladder, or fuel for a signal fire.', [['climax', 'Repair the ladder and reach the platform'], ['fire', 'Use the wood for a fire below']], 'Let the attempted solution create a new pressure.', 'squall'),
      scene('beach', 'Too much wind', 'Our arrow of stones was clear from the tower but invisible from the water. I spread the red cloth beside it. The wind nearly carried it away. Nia pointed to a sheltered hollow where smoke might rise straight before the storm arrived.', [['fire', 'Try a sheltered signal fire'], ['sail', 'Lift the cloth between two poles']], 'Give this route its own obstacle.', 'squall'),
      scene('fire', 'Smoke before rain', 'The fire caught in the hollow. Smoke rose, then bent toward the tower. Beyond the reef, the sail turned. Nia smiled until we heard a crack above us. The repaired ladder was slipping, and the old platform shook in the wind.', [['climax', 'Return to the tower to help'], ['shore-end', 'Keep the fire visible from the shore']], 'Carry consequences into the next scene.', 'flood'),
      scene('climax', 'What the signal costs', 'From the platform, I could see the boat turning toward us. Then Nia called from below: the ladder was sliding. The red cloth was long enough to lash it in place. It was also our brightest signal. My hands tightened around the same torn corner I had carried from the wreck.', [['together-end', 'Use the cloth to secure the ladder'], ['signal-end', 'Keep the cloth high and call directions to Nia']], 'Make both options protect something valuable.', 'eye'),
      scene('sail', 'A small red sail', 'We raised the cloth between two poles and took turns holding it against the wind. A smaller boat appeared beside the distant sail. Nia grinned through the rain. The cloth that had once marked our wreck was bringing someone toward our shore.', [], 'Echo the opening object in a changed situation.', 'landfall'),
      scene('shore-end', 'Keep the fire alive', 'I fed the last dry sticks into the fire. Nia found another way down through the tower’s stone stairwell. By the time the rescue boat reached the sand, we were waiting together. I left a ring of stones around the embers so no one would step into them.', [], 'Resolve the consequence of staying below.', 'landfall'),
      scene('together-end', 'A knot that held', 'The cloth held the ladder while Nia climbed down. We reached the beach with nothing bright left to wave, but the boat had already seen us. On board, Nia tied the last red thread around my wrist. I had wanted to make the signal. I had learned to notice who needed it.', [], 'Show character change through an image.', 'landfall'),
      scene('signal-end', 'A voice through the wind', 'I held the cloth high and shouted where the ladder still met solid stone. Nia moved one step at a time, trusting my voice. When the boat arrived, my throat was raw. Nia took the cloth from my shaking hands. “Next time,” she said, “we make the plan together.”', [], 'Let rescue leave a relationship changed.', 'landfall'),
    ],
  },
];
