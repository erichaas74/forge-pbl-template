import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// src/app/projects/survival-island-story-lab/survival-island.weeks.ts
function scene(id, title, starterText, choices, craftPrompt, stormStageId = "warning") {
  return __spreadProps(__spreadValues(__spreadProps(__spreadValues({
    id,
    mapLabel: title,
    suggestedTitle: title,
    starterText,
    kind: choices.length ? "scene" : "ending"
  }, choices.length ? {} : { endingOutcome: "survival" }), {
    purpose: craftPrompt,
    craftPrompt,
    stormStageId
  }), choices.length ? { choiceQuestion: "What will you do?" } : {}), {
    choices: choices.map(([nextNodeId, prompt], index) => ({ id: `${id}-${index + 1}`, nextNodeId, prompt }))
  });
}
var survivalIslandPreviewWeeks = [
  {
    id: "shore-voices",
    week: 1,
    title: "A voice on the shore",
    setting: "A fictional island landing. Build a voice, a goal, and a decision the reader can feel.",
    startNodeId: "shore",
    sessions: [
      { title: "Write the opening", tool: "write", nodeId: "shore", mission: "Replace the sample opening with your own. Put the reader inside one sound, one movement, and one urgent wish.", product: "An opening scene with a clear viewpoint and character goal." },
      { title: "Let the characters disagree", tool: "write", nodeId: "shelter", mission: "Give the two characters distinct voices. Rewrite their dialogue and offer two decisions that reveal what each values.", product: "A dialogue scene and two reader choices for a writing circle." }
    ],
    questions: ["What does your narrator notice that another character might miss?", "Which action reveals the character\u2019s goal?", "How does the dialogue make the two choices feel different?"],
    evidence: ["Opening prose and point of view.", "Dialogue, choice labels, and the scene reached by each choice."],
    controls: ["Select the writing scene and starting detail.", "Adjust viewpoint, tone, and character pressure.", "Offer a shorter or more complex sample and change reader-choice prompts."],
    scenes: [
      scene("shore", "Salt on the wind", "Salt scratched my lips. I dragged the red bag above the foam and listened for another voice. \u201CNia?\u201D Only the pebbles answered. Then a whistle came from the trees, and a second whistle rose from the ridge. I could not follow both.", [["shelter", "Follow the whistle in the trees"], ["ridge", "Climb toward the ridge"]], "Show a goal through a concrete action. Keep the same narrator throughout."),
      scene("shelter", "Two kinds of courage", "\u201CWe should stay where they can find us,\u201D Nia said. She tightened her grip on the red bag. \u201CAnd wait until we are soaked?\u201D I pointed to a roof of tangled branches. Nia shook her head. \u201CThat roof cannot see a rescue boat.\u201D", [["warm", "Build shelter together"], ["watch", "Take turns watching the shore"]], "Replace the dialogue. Let each speaker want something reasonable.", "squall"),
      scene("ridge", "The answering whistle", "At the top, I found a hollow reed wedged between two stones. Wind made the sound I had followed. Below me, Nia waved both arms. I could see her shelter, and beyond it a strip of bright water where a boat might pass.", [["watch", "Return and organize a lookout"], ["signal", "Make a marker on the ridge"]], "Let a discovery change what the character believes.", "squall"),
      scene("warm", "A roof for two", "We wove the last branch into place as rain reached the beach. Nia set the red bag between us and laughed at our crooked roof. I had wanted to be the brave one. Now I was glad we had been brave in different ways.", [], "Echo an opening detail with a new meaning.", "landfall"),
      scene("watch", "Your turn, my turn", "I watched while Nia rested. Later she tapped my shoulder and took my place. The horizon was still empty, but we had a plan that belonged to both of us. I tucked the whistle reed into the red bag for tomorrow.", [], "Show how the relationship changes.", "landfall"),
      scene("signal", "A mark above the rain", "The arrow of pale stones pointed toward our beach. When I climbed down, Nia had left a dry place for me beneath the branches. From the shelter we could see our marker on the ridge. Neither of us had solved everything alone.", [], "Resolve the immediate decision without solving every problem.", "landfall")
    ]
  },
  {
    id: "river-cost",
    week: 2,
    title: "The price of a choice",
    setting: "A flooded ravine divides the island. Change the routes, then make each outcome follow from a decision.",
    startNodeId: "crossing",
    sessions: [
      { title: "Build the consequence map", tool: "map", nodeId: "crossing", mission: "Explore the routes. Select a scene to rewrite it, turn a path into an ending, or extend an ending with two new branches.", product: "A branching map with visibly different costs and consequences." },
      { title: "Try the other route", tool: "read", nodeId: "crossing", mission: "Read both routes through the crossing. Return to writing wherever a consequence does not follow from its choice.", product: "Two playable outcomes for the writing circle to compare." }
    ],
    questions: ["What does each option protect, and what does it risk?", "Could the reader predict the kind of consequence without knowing the ending?", "Does the outcome actually depend on the chosen route?"],
    evidence: ["Graph structure and connected scenes.", "Choice wording, supply details, and paths tried."],
    controls: ["Change the crossing problem, available supplies, or time pressure.", "Add, end, and restore branches; select a destination.", "Start a reader test on any available scene."],
    scenes: [
      scene("crossing", "The broken bridge", "The river had taken the middle of the bridge. On the far bank, a silver tarp flashed between the trees: our shelter supplies. I had a rope and one dry meal. Nia watched the water rise against a painted mark on the post.", [["rope", "Spend the rope on a crossing line"], ["detour", "Keep the rope and take the long trail"]], "Make the resources and the risk concrete."),
      scene("rope", "One rope, two jobs", "The crossing line held. Halfway across, I saw our supply box turning in an eddy below. I could lower the rope to hook it, but then Nia would have no line to follow. Her hand was already reaching for the first plank.", [["together", "Keep the crossing line for Nia"], ["supplies", "Retrieve the box before it drifts away"]], "Show a real tradeoff with no secret correct answer.", "flood"),
      scene("detour", "The long way", "By dusk the trail had climbed above the flood. We still had the rope, but our dry meal was gone. Below us, the silver tarp shone through the trees. A steep shortcut led down; the marked trail continued into the dark.", [["late", "Stay on the marked trail"], ["shortcut", "Use the rope on the shortcut"]], "Make the long route cost something different.", "squall"),
      scene("together", "Across together", "Nia reached the bank as the box escaped the eddy and vanished. We had lost the supplies, but we could carry the fallen branches together. Our first shelter was small. We tied the useless scraps into a flag and promised to search at daylight.", [], "Connect the missing resource to the earlier choice.", "landfall"),
      scene("supplies", "A box between banks", "I caught the box and dragged it onto the gravel. Across the river, Nia called my name. We had blankets now, but we were on opposite banks. I held one bright blanket high while she found a dry ledge to wait for morning.", [], "Show the cost even when the immediate plan works.", "landfall"),
      scene("late", "Shelter after dark", "We reached the tarp after the last light faded. We were hungry and tired, but the marked trail had kept us above the flood. I hung the rope beside our doorway. Tomorrow it could help us carry supplies instead of crossing a river.", [], "Pay off the route\u2019s time cost.", "landfall"),
      scene("shortcut", "A shorter way down", "The rope brought us safely to the trees beside the tarp. Its rough end frayed against the rock, too short now for another crossing. We had shelter before dark. I coiled what remained and wondered what tomorrow would ask us to give up.", [], "Keep the gain and the cost visible.", "landfall")
    ]
  },
  {
    id: "lantern-repair",
    week: 3,
    title: "The missing lantern",
    setting: "A continuity puzzle: two trails meet at one cave. The sample deliberately forgets where its lantern went.",
    startNodeId: "camp",
    sessions: [
      { title: "Repair the shared scene", tool: "revise", nodeId: "cave", mission: "Compare the sample with your draft. Trace both arrivals at the cave, then repair the lantern detail so either route makes sense.", product: "A revised scene that works after two different routes." },
      { title: "Test every ending", tool: "read", nodeId: "camp", mission: "Try both trails and the alternate endings. Use the path strip to revisit a scene and adjust an inconsistent detail.", product: "A playable continuity repair and alternate endings for reader testing." }
    ],
    questions: ["Who has the lantern on each route?", "What must be true whenever the reader reaches the shared scene?", "Which change fixes continuity while keeping tension?"],
    evidence: ["Original sample beside the revised prose.", "Both incoming paths, object references, and ending details."],
    controls: ["Choose the continuity fault and convergence point.", "Change clue order, object ownership, or pacing.", "Select a test route and compare it with another ending."],
    scenes: [
      scene("camp", "One lantern left", "We had one lantern and two trails to the cave. Nia offered to check the ridge while I explored the shore. \u201CWhoever reaches the cave first should wait,\u201D she said. I checked the lantern latch and chose which trail to take.", [["ridge", "Give Nia the lantern and take the shore"], ["tide", "Carry the lantern along the ridge"]], "Establish who owns the important object."),
      scene("ridge", "An empty hand", "Nia climbed away with our only lantern. I walked the shore by the light of the moon. At the cave entrance I could see no footprints. I was first, and my hands were empty. From inside came a faint tapping.", [["cave", "Enter the cave before Nia arrives"], ["wait", "Wait outside for Nia"]], "Track the lantern through this route.", "squall"),
      scene("tide", "A light in the rain", "I carried the lantern up the ridge. Rain hissed on its glass, but the flame held. The trail ended beside the cave. I lifted the light to read a mark on the stone. Below me, Nia was still crossing the shore.", [["cave", "Follow the tapping into the cave"], ["wait", "Wait at the entrance"]], "Keep this route consistent with the shared scene.", "squall"),
      scene("cave", "The impossible light", "I raised my lantern and the chamber glowed gold. The tapping came from a loose board in the wind. Under it lay a dry map. I could take the map back to camp, or leave a mark to show Nia where I had gone.", [["map", "Carry the map back to camp"], ["mark", "Mark the entrance and wait"]], "Deliberate sample fault: how can this scene work when Nia has the only lantern?", "flood"),
      scene("wait", "A light shared", "We met beneath the cave\u2019s stone lip. Together we held the lantern over the marks on the wall. The waiting had cost us daylight, but now neither of us had to guess where the other had gone. We entered side by side.", [], "Resolve the object and relationship threads.", "landfall"),
      scene("map", "The path on paper", "At camp I spread the dry map on a flat stone. When Nia arrived, I showed her the trail I had found. She pointed to a symbol I had missed. The map gave us a direction, but only our two journeys made it useful.", [], "Check whether the ending fits both arrivals.", "landfall"),
      scene("mark", "A sign to follow", "I arranged three stones at the entrance and waited where the moon could find me. Nia spotted the sign before she heard my voice. We had made separate journeys, but the next part of the map would be a journey together.", [], "Bring back a detail that both paths support.", "landfall")
    ]
  },
  {
    id: "signal-final",
    week: 4,
    title: "The last signal",
    setting: "A complete fictional rescue story. Shape a climax, change the endings, and let someone play the result.",
    startNodeId: "beacon",
    sessions: [
      { title: "Shape the final decision", tool: "write", nodeId: "climax", mission: "Rewrite the final decision. Make its alternatives call back to earlier details, then edit or extend the endings.", product: "A revised climax and endings in an individual branching story." },
      { title: "Play the story", tool: "read", nodeId: "beacon", mission: "Hand over the reader view for a local demonstration. Try another route, then return to the writer to make changes.", product: "A playable story demonstration for the writing circle." }
    ],
    questions: ["Which early detail makes the final choice feel earned?", "What changes in the character across each route?", "How would a new constraint change the ending without breaking earlier scenes?"],
    evidence: ["Opening-to-ending paths and their consequences.", "Climax wording, ending images, and revisions made after reading."],
    controls: ["Control the whole draft graph and scene selection.", "Change the final dilemma, weather pressure, or tone.", "Choose alternate endings and reader starting points."],
    scenes: [
      scene("beacon", "A sail beyond the reef", "For three days the old signal tower had been a dark tooth above our camp. This morning a sail appeared beyond the reef. Nia held up the red cloth we had saved from the boat. \u201CThey need to see us before the rain comes,\u201D she said.", [["tower", "Climb the tower with the red cloth"], ["beach", "Build a signal on the beach"]], "Plant an object that matters again in the ending."),
      scene("tower", "The missing rung", "A rung snapped under my boot. Nia braced the ladder below me while the red cloth tugged at my wrist. Above us, the platform faced the distant sail. The broken rung could become a splint for the ladder, or fuel for a signal fire.", [["climax", "Repair the ladder and reach the platform"], ["fire", "Use the wood for a fire below"]], "Let the attempted solution create a new pressure.", "squall"),
      scene("beach", "Too much wind", "Our arrow of stones was clear from the tower but invisible from the water. I spread the red cloth beside it. The wind nearly carried it away. Nia pointed to a sheltered hollow where smoke might rise straight before the storm arrived.", [["fire", "Try a sheltered signal fire"], ["sail", "Lift the cloth between two poles"]], "Give this route its own obstacle.", "squall"),
      scene("fire", "Smoke before rain", "The fire caught in the hollow. Smoke rose, then bent toward the tower. Beyond the reef, the sail turned. Nia smiled until we heard a crack above us. The repaired ladder was slipping, and the old platform shook in the wind.", [["climax", "Return to the tower to help"], ["shore-end", "Keep the fire visible from the shore"]], "Carry consequences into the next scene.", "flood"),
      scene("climax", "What the signal costs", "From the platform, I could see the boat turning toward us. Then Nia called from below: the ladder was sliding. The red cloth was long enough to lash it in place. It was also our brightest signal. My hands tightened around the same torn corner I had carried from the wreck.", [["together-end", "Use the cloth to secure the ladder"], ["signal-end", "Keep the cloth high and call directions to Nia"]], "Make both options protect something valuable.", "eye"),
      scene("sail", "A small red sail", "We raised the cloth between two poles and took turns holding it against the wind. A smaller boat appeared beside the distant sail. Nia grinned through the rain. The cloth that had once marked our wreck was bringing someone toward our shore.", [], "Echo the opening object in a changed situation.", "landfall"),
      scene("shore-end", "Keep the fire alive", "I fed the last dry sticks into the fire. Nia found another way down through the tower\u2019s stone stairwell. By the time the rescue boat reached the sand, we were waiting together. I left a ring of stones around the embers so no one would step into them.", [], "Resolve the consequence of staying below.", "landfall"),
      scene("together-end", "A knot that held", "The cloth held the ladder while Nia climbed down. We reached the beach with nothing bright left to wave, but the boat had already seen us. On board, Nia tied the last red thread around my wrist. I had wanted to make the signal. I had learned to notice who needed it.", [], "Show character change through an image.", "landfall"),
      scene("signal-end", "A voice through the wind", "I held the cloth high and shouted where the ladder still met solid stone. Nia moved one step at a time, trusting my voice. When the boat arrived, my throat was raw. Nia took the cloth from my shaking hands. \u201CNext time,\u201D she said, \u201Cwe make the plan together.\u201D", [], "Let rescue leave a relationship changed.", "landfall")
    ]
  }
];

// src/app/projects/survival-island-story-lab/survival-island.config.ts
var survivalIslandStoryLabConfig = {
  previewWeeks: survivalIslandPreviewWeeks,
  schemaVersion: "1.0",
  template: { id: "narrative-studio", version: "1.3" },
  authoringMode: "student-branches",
  projectId: "survival-island-story-lab",
  projectVersion: "1.2.0",
  title: "Survival Island Story Lab",
  subtitle: "Interactive Individual Narrative Studio",
  drivingQuestion: "How can a writer make every reader choice reveal character and change what happens next?",
  coachName: "Storm Guide",
  coachPromise: "I ask one question at a time and remember your answers. Your ideas\u2014not mine\u2014decide what happens.",
  launchImage: "/narrative-studio/survival-island-history-launch-v1.jpg",
  launchImageAlt: "A fictional young survivor faces a stormy island horizon where a voyaging canoe, an eighteenth-century ship, and an Antarctic lifeboat suggest three historical settings.",
  historicalSettings: [
    {
      id: "pacific-wayfinding",
      icon: "\u2726",
      eraLabel: "Pacific voyaging \xB7 Before modern instruments",
      title: "The stars vanish",
      historicalEvent: "Traditional Polynesian wayfinding across the Pacific",
      overview: "Polynesian navigators crossed vast ocean distances by reading stars, waves, winds, clouds, birds, and other signs in the living environment.",
      fictionalRole: "A fictional apprentice wayfinder traveling with an experienced crew toward an island they cannot yet see.",
      survivalPressure: "Storm clouds erase the stars, a current pulls the canoe off course, and the crew turns to your character for one observation everyone else missed.",
      openingLine: "The last guiding star disappears\u2014and your character realizes the ocean has been warning them all night.",
      accuracyBoundary: "Treat wayfinding as skilled, learned knowledge\u2014not luck or magic. Keep your protagonist fictional and show respect for Pacific cultures.",
      sourceLabel: "Smithsonian: H\u014Dk\u016Ble\u02BBa and Hawaiian wayfinding",
      sourceUrl: "https://folklife.si.edu/magazine/hokulea-hawaiian-wayfinding"
    },
    {
      id: "selkirk-1709",
      icon: "\u2668",
      eraLabel: "M\xE1s a Tierra \xB7 2 February 1709",
      title: "A fire on the deserted shore",
      historicalEvent: "The rescue of Alexander Selkirk after four years and four months alone",
      overview: "A British privateering expedition found Alexander Selkirk living on M\xE1s a Tierra, an island off Chile, after he had survived there for more than four years.",
      fictionalRole: "A fictional young deckhand sent ashore with the rescue boat as rough weather closes around the island.",
      survivalPressure: "The signal fire belongs to a stranger, the landing boat is being dragged toward rocks, and your character must decide whom\u2014or what\u2014to save first.",
      openingLine: "Someone is running down the mountain in goatskins, but the wave behind your character is already taking the boat.",
      accuracyBoundary: "Selkirk, his rescue date, and the expedition are fixed history. Invent your character\u2019s private choices around those facts without replacing the real people.",
      sourceLabel: "Historic Environment Scotland: Selkirk\u2019s rescue",
      sourceUrl: "https://blog.historicenvironment.scot/2020/01/incredible-voyages/"
    },
    {
      id: "elephant-island-1916",
      icon: "\u2744",
      eraLabel: "Elephant Island \xB7 24 April 1916",
      title: "The rescue boat disappears",
      historicalEvent: "Shackleton\u2019s crew stranded on Elephant Island",
      overview: "After the Endurance was lost, its crew reached Elephant Island. Six men left in the James Caird on an 800-mile rescue journey while the others waited.",
      fictionalRole: "A fictional young expedition assistant among the people left on the icebound island.",
      survivalPressure: "The rescue boat vanishes into freezing spray, a shelter wall starts to fail, and your character discovers a message that could divide the camp.",
      openingLine: "By the time the James Caird becomes a black dot, the ice beneath your character\u2019s boots has begun to crack.",
      accuracyBoundary: "All 28 real Endurance crew members survived. Keep that outcome and the real people intact while branching your fictional character\u2019s experience.",
      sourceLabel: "Royal Museums Greenwich: Antarctic explorers",
      sourceUrl: "https://www.rmg.co.uk/stories/maritime-history/history-antarctic-explorers"
    }
  ],
  planningQuestions: [
    {
      id: "person",
      bibleField: "protagonist",
      prompt: "Who is the fictional person you want us to follow? Describe them in your own words. What is one thing they are good at\u2014and one thing they still need to learn?"
    },
    {
      id: "want",
      bibleField: "immediateGoal",
      prompt: "What does this person want right now, before the larger adventure begins? Explain why it matters to them personally."
    },
    {
      id: "fear",
      bibleField: "innerFear",
      prompt: "What worry, fear, or mistaken belief could make their next choice difficult? Explain how it might affect what they do."
    },
    {
      id: "relationship",
      bibleField: "companion",
      prompt: "Who else matters in this moment? Describe what this person wants and why the two characters may not agree."
    },
    {
      id: "object",
      bibleField: "importantObject",
      prompt: "Choose one object that could become useful, costly, or meaningful. Where did it come from, and why would your character hate to lose it?"
    },
    {
      id: "unknown",
      bibleField: "islandSecret",
      prompt: "What truth, mystery, or unanswered question will pull the character deeper into the story? It can be completely different from the example spark."
    }
  ],
  storyBiblePrompts: {
    protagonist: "Who will we follow? Include one strength and something they need to learn.",
    immediateGoal: "What do they want right now, and why does it matter to them?",
    innerFear: "What fear, flaw, or false belief could shape their choices?",
    islandSecret: "What truth, mystery, or unanswered question pulls them deeper into the story?",
    companion: "Who else matters, what do they want, and why might they disagree?",
    importantObject: "What object could become useful, costly, meaningful, or all three?",
    pointOfView: "Choose who tells the story.",
    tone: "Choose the emotional weather of the story."
  },
  stormStages: [
    {
      id: "warning",
      label: "Opening change",
      pressure: "The writer decides what interrupts the character\u2019s plan.",
      authorPrompt: "What changes, and why does your character have to respond now?"
    },
    {
      id: "squall",
      label: "New complication",
      pressure: "The writer decides what makes the first choice harder than expected.",
      authorPrompt: "What new fact, feeling, or problem changes the meaning of the path?"
    },
    {
      id: "flood",
      label: "A cost appears",
      pressure: "The writer decides what the character may lose by continuing.",
      authorPrompt: "What does this attempt cost, even if it works?"
    },
    {
      id: "eye",
      label: "Final decision",
      pressure: "The writer decides which values come into conflict.",
      authorPrompt: "What can the character protect, and what must each option risk?"
    },
    {
      id: "landfall",
      label: "Consequences",
      pressure: "The writer decides how earlier choices change the ending.",
      authorPrompt: "What earlier detail returns, and what does it mean now?"
    }
  ],
  startNodeId: "shore",
  nodes: [
    {
      id: "shore",
      kind: "scene",
      mapLabel: "Opening Moment",
      suggestedTitle: "Something Changes",
      purpose: "Introduce the person, what they want, and the change that makes action necessary.",
      craftPrompt: "Begin inside a change you invented. Let one concrete detail make it feel real.",
      choiceQuestion: "What do you do next?",
      stormStageId: "warning",
      choices: [
        { id: "shore-high", nextNodeId: "ridge", prompt: "Build a fire to signal for help" },
        { id: "shore-water", nextNodeId: "lagoon", prompt: "Look for water before moving on" }
      ]
    },
    {
      id: "ridge",
      kind: "scene",
      mapLabel: "Knowledge Path",
      suggestedTitle: "What They Learn",
      purpose: "Let the character gain information that changes what they think they should do.",
      craftPrompt: "What do they learn, and why does it create a harder question?",
      choiceQuestion: "What do you do next?",
      stormStageId: "squall",
      choices: [
        { id: "ridge-cave", nextNodeId: "cave", prompt: "Follow the new clue" },
        { id: "ridge-signal", nextNodeId: "signal", prompt: "Try a risky signal" }
      ]
    },
    {
      id: "lagoon",
      kind: "scene",
      mapLabel: "Resource Path",
      suggestedTitle: "What They Find",
      purpose: "Let the character find something useful, then reveal why using it will not be simple.",
      craftPrompt: "What do they find, and what unexpected problem comes with it?",
      choiceQuestion: "What do you do next?",
      stormStageId: "squall",
      choices: [
        { id: "lagoon-cave", nextNodeId: "cave", prompt: "Investigate what you found" },
        { id: "lagoon-signal", nextNodeId: "signal", prompt: "Use it to call for help" }
      ]
    },
    {
      id: "cave",
      kind: "scene",
      mapLabel: "Discovery",
      suggestedTitle: "The Hidden Truth",
      purpose: "Reveal part of the unknown truth and change what the character believes.",
      craftPrompt: "Answer one reader question, then let the answer create a better question.",
      choiceQuestion: "What do you do next?",
      stormStageId: "flood",
      choices: [
        { id: "cave-eye", nextNodeId: "eye", prompt: "Carry the discovery into the storm" },
        {
          id: "cave-truth",
          nextNodeId: "ending-truth",
          prompt: "Protect the truth and end the search"
        }
      ]
    },
    {
      id: "signal",
      kind: "scene",
      mapLabel: "Risky Attempt",
      suggestedTitle: "The Plan Meets Trouble",
      purpose: "Let the character try an idea and discover a consequence they did not expect.",
      craftPrompt: "Whether the attempt works or fails, what does it reveal about the character?",
      choiceQuestion: "What do you do next?",
      stormStageId: "flood",
      choices: [
        { id: "signal-eye", nextNodeId: "eye", prompt: "Risk one more attempt" },
        {
          id: "signal-stay",
          nextNodeId: "ending-stay",
          prompt: "Stay and protect what matters"
        }
      ]
    },
    {
      id: "eye",
      kind: "scene",
      mapLabel: "Final Decision",
      suggestedTitle: "The Choice That Matters Most",
      purpose: "Bring the branches together and force a choice between competing values.",
      craftPrompt: "Use the values you described in the chat. Let every option protect and risk something.",
      choiceQuestion: "What do you do next?",
      stormStageId: "eye",
      choices: [
        { id: "eye-rescue", nextNodeId: "ending-rescue", prompt: "Act now and seek rescue" },
        { id: "eye-truth", nextNodeId: "ending-truth", prompt: "Reveal the truth before leaving" }
      ]
    },
    {
      id: "ending-rescue",
      kind: "ending",
      mapLabel: "Action Ending",
      suggestedTitle: "What Their Action Changes",
      purpose: "Resolve the final action and show what it costs or protects.",
      craftPrompt: "Show how the person is different because of choices the reader made.",
      stormStageId: "landfall",
      choices: []
    },
    {
      id: "ending-truth",
      kind: "ending",
      mapLabel: "Truth Ending",
      suggestedTitle: "What the Truth Changes",
      purpose: "Resolve the central question and make the answer matter to the person\u2019s future.",
      craftPrompt: "Connect the revelation to an earlier clue so it feels surprising but earned.",
      stormStageId: "landfall",
      choices: []
    },
    {
      id: "ending-stay",
      kind: "ending",
      mapLabel: "Responsibility Ending",
      suggestedTitle: "What They Choose to Protect",
      purpose: "Resolve a choice to take responsibility and show what the person now protects.",
      craftPrompt: "End on a concrete image from your story that now carries a larger meaning.",
      stormStageId: "landfall",
      choices: []
    }
  ],
  rubric: [
    {
      id: "character",
      label: "Character under pressure",
      expectation: "The protagonist\u2019s goals, fears, and choices shape what happens."
    },
    {
      id: "craft",
      label: "Narrative craft",
      expectation: "Description, dialogue, pacing, and point of view create a deliberate experience."
    },
    {
      id: "branching",
      label: "Meaningful consequences",
      expectation: "Reader choices offer different costs and produce visible later consequences."
    },
    {
      id: "revision",
      label: "Revision and continuity",
      expectation: "Details remain consistent across paths, and playtesting leads to purposeful revisions."
    }
  ]
};

export {
  survivalIslandStoryLabConfig
};
//# debugId=0c8e7459-4414-562e-b43e-7afda436000e
//# sourceMappingURL=chunk-5GZIIEA6.js.map
