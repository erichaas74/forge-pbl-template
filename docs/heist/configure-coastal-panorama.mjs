// Update only this project's optional authoring-preview capability.
import fs from 'node:fs';
const file = 'public/projects/shadow-gallery/versions/2.0.0/project.json';
const project = JSON.parse(fs.readFileSync(file, 'utf8'));
const rect = (x, y, width, height) => ({ x, y, width, height });
const topic = (id, question, keywords, reply, sourceIds) => ({ id, question, keywords, reply, sourceIds });
const scene = {
  capability: 'panorama.encounter.v1', id: 'coastal-morning', version: 1,
  workId: 'shore-painting-0-restoration', title: 'A morning on the shore',
  setting: 'Hispaniola · early 1492 · before European arrival here',
  invitation: 'Three details in this painting do not belong. Step inside the historical world, meet the people, and gather evidence before deciding what to repair.',
  panorama: '/projects/shadow-gallery/coastal-v1/panorama.png', forgery: '/projects/shadow-gallery/coastal-v1/forgery.png',
  imageAlt: 'A coastal community with a canoe maker at the shore, a central clearing, and a food grower sorting a harvest.',
  attribution: 'AI-generated teaching reconstruction. Fictional characters and English dialogue; clothing and scene layout are illustrative. Historical sources identify what is supported and uncertain. Taíno peoples and their descendants continue today.',
  sources: [
    { id: 'canoe-construction', title: 'Inside a dugout canoe', text: 'A dugout hull is shaped from one trunk. Historical research describes pre-1492 Caribbean canoe builders using stone axes, shell gouges and fire. Metal-fastened plank repairs should not be assumed for this setting.', provenance: 'Historical synthesis: Past & Present, volume 271. The article also covers later centuries; its later techniques are not automatically evidence for 1492.', url: 'https://academic.oup.com/past/article/271/1/52/8231030', rect: rect(0, 47, 30, 48) },
    { id: 'canoe-tools', title: 'A stone blade and a paddle', text: 'Surviving Caribbean artifacts include woodworking tools and paddles. A stone or shell blade could be attached to a wooden handle; a paddle moved the canoe without being fixed to its side.', provenance: 'Oxford SIBA artifact study. The examples are Lucayan/Bahamian comparative evidence, not objects excavated at this fictional Hispaniola location.', url: 'https://siba.web.ox.ac.uk/material-culture-and-cultural-practices', rect: rect(15, 43, 8, 18) },
    { id: 'local-harvest', title: 'What grew in the gardens?', text: 'Archaeologists at En Bas Saline in Haiti identified manioc, maize, peppers, beans and other plants. This evidence supports the manioc and maize shown in the reconstructed work area. A picture alone cannot establish every crop present or absent.', provenance: 'Florida Museum of Natural History: archaeological plant remains from a Taíno site in Haiti, on Hispaniola.', url: 'https://www.floridamuseum.ufl.edu/histarch/research/haiti/en-bas-saline/material-remains/', rect: rect(63, 69, 30, 25) },
    { id: 'exchange-record', title: 'Plants and animals across the Atlantic', text: 'Horses and wheat came to the Americas from the Old World through the Columbian Exchange after contact. An established horse herd and a local wheat harvest do not fit this early-1492 setting. Sweet potatoes, however, were already grown in the Caribbean; they are not the same plant as wheat or Andean potatoes.', provenance: 'OpenStax U.S. History: Columbian Exchange overview, cross-checked with the National Park Service’s Taíno Settlement guide. A later historical source, consulted from your notebook, not a record possessed by the characters.', url: 'https://openstax.org/books/us-history/pages/2-4-new-worlds-in-the-americas-labor-commerce-and-the-columbian-exchange' },
    { id: 'island-travel', title: 'Travel between communities', text: 'Taíno people traveled between islands in dugout canoes, carrying foods, tools and other goods. Canoes connected communities across water. A lack of horses in this illustration is an observation, not sufficient historical proof on its own.', provenance: 'National Park Service, Taíno Settlement: modern educational account of travel and cultivated crops.', url: 'https://www.nps.gov/places/taino-settlement.htm', rect: rect(0, 32, 34, 61) },
  ],
  people: [
    { id: 'canoe-maker', name: 'Canoe maker', activity: 'Shaping the inside of a dugout canoe', rect: rect(16, 25, 18, 62),
      welcome: 'Welcome. I am working on this canoe. What would you like to know?',
      topics: [
        topic('construction', 'How did you make this canoe?', ['make','made','build','built','construction','trunk','tree','hollow'], 'The hull begins as one tree trunk. We shape and hollow the wood with stone tools, shell tools and carefully controlled fire. Look along the inside: it is one shaped hull, not a row of joined planks.', ['canoe-construction','canoe-tools']),
        topic('repair', 'How do you repair the boat?', ['repair','fix','crack','broken','nail','nails','screw','screws','iron','metal'], 'First I examine the wood and the damage. I work with a stone blade and a shell scraper, not iron nails or screws. This hull was shaped from one trunk. Come closer and look at the tools beside me.', ['canoe-construction','canoe-tools']),
        topic('tools', 'Can you show me your tools?', ['tool','tools','stone','shell','axe','blade','show'], 'Here is a shaped blade and its wooden handle. The material and the edge matter for the work. Open the object view to examine them, then compare with the surviving artifacts in the source.', ['canoe-tools']),
        topic('travel', 'How do people and goods travel?', ['travel','carry','goods','transport','paddle','horse','horses','ride','animal','animals'], 'We paddle canoes along the coast and between islands, carrying people and goods. Moving over water is part of our lives. I can tell you about our canoe, but I cannot know what people will bring here in the future.', ['island-travel']),
      ] },
    { id: 'food-grower', name: 'Food grower', activity: 'Sorting manioc roots and maize from the harvest', rect: rect(75, 28, 17, 54),
      welcome: 'Welcome. I am sorting the harvest. What would you like to ask?',
      topics: [
        topic('harvest', 'What are you growing and gathering?', ['grow','growing','grown','gather','harvest','crop','crops','food','eat','maize','corn','wheat','potato','potatoes'], 'Here are manioc roots and maize. Look closely: the long roots and the ears of maize are different parts of different plants. We also cultivate other foods. The archaeological source can help you compare this work area with evidence from Hispaniola.', ['local-harvest']),
        topic('basket', 'May I look inside the basket?', ['basket','look','inside','show','root','roots'], 'Come closer. Compare the maize in the basket with the manioc roots beside it. Save an observation if it helps you remember their shapes.', ['local-harvest']),
        topic('journeys', 'How do you carry the harvest?', ['carry','travel','transport','horse','horses','animal','animals','trade'], 'Baskets help us carry foods. Canoes carry people and goods over water. The canoe maker can explain that work better than I can.', ['island-travel']),
      ] },
  ],
  repairs: [
    { id: 'herd', title: 'The clearing', rect: rect(45, 37, 12, 24), action: 'Restore the open clearing', sourceIds: ['island-travel','exchange-record'] },
    { id: 'fasteners', title: 'The canoe repair', rect: rect(3, 59, 14, 31), action: 'Restore the dugout hull', sourceIds: ['canoe-construction','canoe-tools'] },
    { id: 'harvest', title: 'The harvest basket', rect: rect(79, 65, 14, 24), action: 'Restore the maize harvest', sourceIds: ['local-harvest','exchange-record'] },
  ],
};
scene.questionOwner = 'tutor';
scene.viewpoints = [
  { id: 'village', title: 'Village clearing', image: '/projects/shadow-gallery/coastal-360-v1/village.png', yaw: 0, pitch: -8, people: [{personId:'canoe-maker',rect:rect(18,44,3,10)},{personId:'food-grower',rect:rect(79,44,4,11)}] },
  { id: 'canoe', title: 'Canoe workshop', image: '/projects/shadow-gallery/coastal-360-v1/canoe.png', yaw: -43, pitch: -8, people: [{personId:'canoe-maker',rect:rect(32,38,10,33)}] },
  { id: 'harvest', title: 'Harvest garden', image: '/projects/shadow-gallery/coastal-360-v1/harvest.png', yaw: 8, pitch: -16, people: [{personId:'food-grower',rect:rect(46,46,10,24)}] },
];
scene.viewpoints[0].yaw = -75;
scene.viewpoints[0].places = [
  { targetId: 'canoe', label: 'Explore canoe workshop', yaw: -108, pitch: -9 },
  { targetId: 'harvest', label: 'Explore harvest garden', yaw: 108, pitch: -9 },
];
scene.viewpoints[1].places = [{ targetId: 'village', label: 'Back to village', yaw: 5, pitch: -12 }];
scene.viewpoints[1].inspection = {
  title: 'Canoe workshop', overviewLabel: 'Whole canoe',
  asset: { version: 1, src: '/projects/shadow-gallery/coastal-3d-v1/workshop.glb', nodes: [{name:'INT_hull',kind:'target'},{name:'INT_rim',kind:'target'},{name:'INT_stone',kind:'target'},{name:'SOCKET_overview',kind:'socket'},{name:'ENV_ground',kind:'environment'}], clips: [] },
  environment: {background:'/projects/shadow-gallery/coastal-3d-v1/workshop-background-v1.png',ground:'/projects/shadow-gallery/coastal-3d-v1/workshop-ground-v1.png',groundNode:'ENV_ground',tileSize:3},
  targets: [
    {name:'INT_hull',label:'Hollowed interior',focus:[0,.6,0],distance:2.9},
    {name:'INT_rim',label:'Wooden rim',focus:[.6,.9,0],distance:1.6},
    {name:'INT_stone',label:'Stone tool',focus:[1.8,.42,.4],distance:1.1},
  ],
};
scene.viewpoints[2].places = [{ targetId: 'village', label: 'Back to village', yaw: -38, pitch: -12 }];
scene.viewpoints[2].inspection = {
  title: 'Cultivated field', overviewLabel: 'Whole field',
  asset: {version:1,src:'/projects/shadow-gallery/coastal-3d-v1/field.glb',nodes:[{name:'INT_maize',kind:'target'},{name:'INT_vines',kind:'target'},{name:'INT_roots',kind:'target'},{name:'INT_ear',kind:'target'},{name:'ENV_ground',kind:'environment'}],clips:[]},
  environment: {background:'/projects/shadow-gallery/coastal-3d-v1/field-background-v1.png',ground:'/projects/shadow-gallery/coastal-3d-v1/field-soil-v1.png',groundNode:'ENV_ground',tileSize:3},
  targets:[
    {name:'INT_maize',label:'Maize plants',focus:[-1.35,1,-.5],distance:2.2},
    {name:'INT_vines',label:'Sweet potato vines',focus:[1.2,.25,-.4],distance:1.8},
    {name:'INT_roots',label:'Harvested roots',focus:[.05,.22,2.2],distance:1},
    {name:'INT_ear',label:'Ear of maize',focus:[.78,.27,2.25],distance:1},
  ],
};
scene.sources.push({id:'sweet-potato-crop',title:'Taíno garden crops',text:'Maize and sweet potatoes were cultivated by Taíno communities. Sweet potatoes are a different crop from ordinary potatoes. The field model illustrates these crops; its layout and plant varieties are not archaeological measurements.',provenance:'National Park Service, Taíno Settlement at Salt River Bay, St. Croix. Regional comparative evidence, not an excavation record for this fictional Hispaniola field.',url:'https://www.nps.gov/places/taino-settlement.htm'});
project.previewWeeks.scenes = [scene];
const session = project.previewWeeks.weeks[0].sessions[0];
session.title = 'Enter the painting: a morning on the shore';
session.steps = ['Look at the painting, then enter its historical world.', 'Look around for place markers. Visit the canoe workshop and harvest garden, explore each close-up panorama, and inspect sources.', 'Return to the painting. Investigate and repair three inconsistent details.'];
session.product = 'A restored coastal picture with three independent repairs and sources gathered while exploring the 360° world.';
fs.writeFileSync(file, JSON.stringify(project, null, 2) + '\n');
