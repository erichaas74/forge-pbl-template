import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// Keep the original 1.0.0 package byte-for-byte intact for existing practice records.
const root = new URL('../../public/projects/shadow-gallery/', import.meta.url);
const mission = JSON.parse(readFileSync(new URL('project.json', root), 'utf8'));
const media = '/projects/shadow-gallery/encounters/';
const speech = (id, title, speaker, text, evidenceIds, extra = {}) => ({ id, title, speaker, text, evidenceIds, audioSrc: `${media}${id}.m4a`, ...extra });
mission.schemaVersion = '1.2';
mission.projectVersion = '1.1.0';
mission.encounters = [{
  id: 'coastal-encounter', type: 'guided-scene', version: '1.0.0', chamberIds: ['shore'],
  title: 'A shore with a history', location: 'Hispaniola · Caribbean', date: 'The setting claimed by the frame: 1492',
  invitation: 'Step through the frame. Look around, take a seat, and bring a better question back to the gallery.',
  image: `${media}coastal-v1.png`,
  imageAlt: 'An illustrative Caribbean shore: a dugout canoe rests beside the water, maize grows near the landing, and a fictional host offers a seat in the shade.',
  entryViewId: 'shoreline',
  host: { name: 'Your coastal host', role: 'Fictional character in a Taíno-associated reconstruction', greeting: 'Welcome. There is a place to sit in the shade. You can look around first, or stay and listen.' },
  attribution: 'This is a museum reconstruction, with generated artwork and original scripted dialogue. The host is fictional, not a recorded historical witness. The spoken account is a synthesized museum audio guide, not an Indigenous oral history. The source notes support the historical claims; scenery, clothing and conversation are illustrative. Taíno history and identity continue into the present. Explore the cited museum sources for their contributors’ perspectives.',
  views: [
    { id: 'shoreline', label: 'Look around', mode: 'observe', position: 25, zoom: 1, description: 'Water, a landing, a place to work. Notice the setting before deciding what its labels mean.' },
    { id: 'listening-place', label: 'Sit & listen', mode: 'listen', position: 76, zoom: 1.18, description: 'Take the offered seat. Listen to the museum account, or read it at your own pace.' },
    { id: 'conversation', label: 'Ask a question', mode: 'talk', position: 76, zoom: 1.28, description: 'Start with something you noticed. Follow-up questions open as the conversation develops.' },
    { id: 'canoe-landing', label: 'Explore the canoe', mode: 'object', position: 22, zoom: 1.3, description: 'Move closer to the landing. Examine the illustration, then consider what a picture can establish.' },
  ],
  chapters: [
    speech('coast-story-place', 'Before the date on the frame', 'Museum audio guide', 'Take a moment beside the water. The frame in the gallery gives this scene a date: 1492. That date refers to Columbus’s first Caribbean arrival. It does not mark the beginning of life or history here. Taíno communities already lived across much of the Caribbean, including Hispaniola. Our illustration places a canoe and a garden beside a landing. It invites you to imagine a setting; it is not a photograph of a particular morning.', ['first-contact', 'island-people']),
    speech('coast-story-travel', 'Things move. Origins matter.', 'Museum audio guide', 'Look from the canoe toward the maize. The exchange reference places maize and potatoes in the Americas. It describes European horses and wheat reaching the Americas from the Old World after contact. A label can quietly reverse that story. Something familiar in a place today did not necessarily originate there. Back in the gallery, pay attention to words such as before, after, and already established. Those words can change a claim completely.', ['exchange-origins']),
    speech('coast-story-record', 'A picture and a claim', 'Museum audio guide', 'Now think about the name on the frame. The community reference places the Inca in the Andes of South America and Taíno communities in the Caribbean. That is a relationship to test with evidence, not a guess based on someone’s appearance. This host and this conversation are fictional. When you return, carry a question with you: which source supports or contradicts the exact claim? The scene may help you remember, but the source must do the proving.', ['island-people', 'andean-people']),
  ],
  questions: [
    speech('coast-question-canoe', 'May I look more closely at the canoe?', 'Coastal host · fictional dialogue', 'Of course. Come toward the landing and look along its hollowed shape. You can use the close view to notice details, then return here when you are ready.', ['island-people']),
    speech('coast-question-place', 'The frame says Inca. How can I check that?', 'Museum audio guide', 'Open the community reference. It places the Inca in the Andes and Taíno communities in the Caribbean. Check the label against that place evidence. The appearance of our fictional host cannot identify a historical community.', ['island-people', 'andean-people']),
    speech('coast-question-horses', 'What is wrong with horses already here before contact?', 'Museum audio guide', 'The claim is about established European horse herds before contact. The exchange reference describes European horses coming from the Old World after contact. Compare that timing with the words on the painting. This does not mean a horse in every later American scene would be impossible.', ['exchange-origins']),
    speech('coast-question-proof', 'Can the absence of horses in this scene prove the claim?', 'Museum audio guide', 'No. An illustrator can leave something out. Our scene is a reconstruction, so its empty spaces are not independent historical proof. Use the exchange reference to test the introduction and timing claim.', ['exchange-origins'], { requiresQuestionId: 'coast-question-horses' }),
    speech('coast-question-date', 'Did Caribbean history begin in 1492?', 'Museum audio guide', 'No. The date describes European arrival, not the beginning of Caribbean history. The community reference describes people already living in the region. A record of arrival should not erase that earlier history.', ['first-contact', 'island-people']),
  ],
  object: {
    id: 'dugout-study', title: 'The canoe at the landing', position: 22,
    description: 'Use the lens to look along the illustrated hull. Select a detail to record an observation. This is an illustrated study, not a scanned historical artifact.',
    features: [
      { id: 'hollowed-hull', label: 'Look inside the hull', text: 'The illustration shows a long hollowed interior. That is an observation about this depiction, not proof of an exact historical object’s age or owner.' },
      { id: 'landing', label: 'Notice the landing', text: 'The canoe rests beside the water in the reconstruction. The setting helps you understand the frame’s claim; the community and date references let you test it.' },
      { id: 'image-limits', label: 'Ask what the image cannot prove', text: 'This generated image cannot establish the identity of a particular person, the exact design of a historical canoe, or whether an absent object existed. Those claims need independent sources.' },
    ], evidenceIds: ['island-people', 'first-contact'],
  },
  insight: {
    title: 'A timing clue to take back',
    claim: 'The painting claims European horse herds were already established on Hispaniola before European contact.',
    evidenceIds: ['first-contact', 'exchange-origins', 'island-people'],
    answerEvidenceId: 'exchange-origins', relationship: 'contradicts',
    explanation: 'Insight recorded: the exchange reference contradicts the claim of established European horse herds before contact. Return to the painting and inspect its specific detail to complete your fraud analysis.',
    hint: 'Choose the reference about where goods and animals began. It describes introduction after contact; compare that with the claim’s words “already established” and “before.” The illustration alone cannot prove it.',
  },
}];
const destination = new URL('versions/1.1.0/', root);
mkdirSync(destination, { recursive: true });
writeFileSync(new URL('project.json', destination), JSON.stringify(mission, null, 2) + '\n');
console.log('Built gallery 1.1.0 with a guided coastal encounter; original 1.0.0 package preserved.');
