// Authoring source for the versioned JSON package. Runtime behavior lives in reusable Heist capabilities.
import { mkdirSync, writeFileSync } from 'node:fs';
const dir = new URL('../../public/projects/shadow-gallery/', import.meta.url);
const asset = '/projects/shadow-gallery/';
const source = {
  exchange: ['National Park Service · Columbian Exchange', 'https://home.nps.gov/casa/learn/historyculture/columbian-exchange.htm'],
  people: ['Smithsonian · Mesoamerica / Caribbean', 'https://americanindian.si.edu/exhibitions/infinityofnations/mesoamerica-caribbean.html'],
  andes: ['Smithsonian · Andes', 'https://americanindian.si.edu/exhibitions/infinityofnations/andes.html'],
  technology: ['Royal Museums Greenwich · Navigation instruments', 'https://www.rmg.co.uk/collections/objects/rmgc-object-43438'],
  clock: ['Royal Museums Greenwich · Harrison’s timekeepers', 'https://www.rmg.co.uk/stories/time/harrisons-clocks-longitude-problem'],
  route: ['Portuguese Ports Association · Vasco da Gama’s voyage', 'https://www.portosdeportugal.pt/detail.php?nID=8235'],
  treaty: ['UNESCO · Treaty of Tordesillas', 'https://www.unesco.org/fr/memory-world/treaty-tordesillas'],
  math: ['OpenStax · Prealgebra 2e', 'https://openstax.org/details/books/prealgebra-2e'],
};
const evidence = [];
function fact(id, category, title, text, citation) { evidence.push({ id, category, title, text, sourceTitle: source[citation][0], sourceUrl: source[citation][1] }); }
fact('first-contact', 'Timeline', 'A date on the shore', 'Columbus’s first Caribbean voyage reached the islands in 1492. This date describes European arrival, not the beginning of Caribbean history.', 'people');
fact('island-people', 'People', 'People of the Caribbean', 'Taíno communities lived across much of the Caribbean, including Hispaniola. Inca communities belonged to the Andes of South America. Regional identity must be established with place and evidence, not appearance.', 'people');
fact('andean-people', 'People', 'An Andean archive', 'The Inca empire was centered in the Andes. Llamas were part of Andean life. A label calling an Andean Inca settlement a Taíno Caribbean island settlement misidentifies its people and place.', 'andes');
fact('exchange-origins', 'Exchange', 'Where the cargo began', 'Maize, potatoes, tomatoes and cacao originated in the Americas. Horses, cattle, wheat and sugarcane reached the Americas from the Old World after contact. A pre-contact island cannot already have established European horse herds.', 'exchange');
fact('navigation-tools', 'Technology', 'Tools across the centuries', 'A magnetic compass and mariner’s astrolabe fit the navigation setting around 1500. The reflecting sextant belongs to the eighteenth century, so it cannot be on a navigator’s desk in 1500.', 'technology');
fact('marine-clock', 'Technology', 'A clock that came later', 'John Harrison developed his marine timekeepers in the eighteenth century; H1 went to sea in 1736. A Harrison-style marine timekeeper does not belong on a desk in 1500.', 'clock');
fact('port-voyage', 'Routes', 'From Lisbon to India', 'Vasco da Gama’s Portuguese expedition departed Lisbon in 1497 and reached Calicut (Kozhikode), India, in 1498, sailing around Africa. The destination already had established communities and trade networks.', 'route');
fact('treaty-date', 'Timeline', 'The treaty on the table', 'The Treaty of Tordesillas was signed on 7 June 1494 between the crowns of Spain and Portugal. Their claims did not erase the sovereignty or presence of Indigenous peoples.', 'treaty');
fact('rotation-rule', 'Mathematics', 'A circle is 360 degrees', 'A full turn is 360°. Multiply the fraction of a turn by 360 to find an angle. Compass bearings start at north and increase clockwise: east 90°, south 180°, west 270°.', 'math');
fact('scale-rule', 'Mathematics', 'From blueprint to passage', 'For a map scale of 1 cm : 4 m, multiply the measured length in centimetres by 4 to determine the real distance in metres.', 'math');
fact('capacity-rule', 'Mathematics', 'When the cart is damaged', 'A capacity reduced by 25% retains 75% of its original capacity. Multiply the original limit by 0.75; add the masses of everything you plan to carry and compare the sum with the new limit.', 'math');
const locks = [];
const item = (id, label, extra = {}) => ({ id, label, ...extra });
function add(id, type, title, prompt, extra, evidenceIds, consequence, hint) {
  const lock = { id, type, title, prompt, domain: ['rotation', 'measurement', 'cargo'].includes(type) ? 'math' : 'history', standard: ['rotation', 'measurement', 'cargo'].includes(type) ? 'Grades 4–8 · Applied mathematics' : 'Historical evidence', evidenceIds, hint, consequence, ...extra }; locks.push(lock); return id;
}
const origins = [item('old', 'Old World · Africa, Asia, Europe'), item('new', 'Americas')];
const exchangeItems = [item('horse', 'Horse'), item('maize', 'Maize'), item('wheat', 'Wheat'), item('potato', 'Potato')];
const exchangeMatch = { horse: 'old', maize: 'new', wheat: 'old', potato: 'new' };
const techItems = [item('clock', 'Harrison marine timekeeper'), item('compass', 'Magnetic compass'), item('sextant', 'Reflecting sextant'), item('astrolabe', 'Mariner’s astrolabe')];
const techZones = [item('available', 'Belongs around 1500'), item('later', 'Invented later')];
const techMatches = { clock: 'later', compass: 'available', sextant: 'later', astrolabe: 'available' };
function sort(id, type = 'sorting') { return add(id, type, 'The exchange crates', 'Sort these goods by their origin before the Columbian Exchange.', { items: exchangeItems, zones: origins, matches: exchangeMatch }, ['exchange-origins'], 'The correctly sorted crates roll onto the trade platform.', 'An item’s origin is different from where it is grown today. Read “Where the cargo began.”'); }
function tech(id) { return add(id, 'technology-sort', 'The navigator’s cabinet', 'Put every instrument in the correct drawer for a workshop in 1500.', { items: techItems, zones: techZones, matches: techMatches }, ['navigation-tools', 'marine-clock'], 'The instrument drawers slide into place and release the brass latch.', 'Both the reflecting sextant and Harrison’s timekeepers were developed after 1500.'); }
function people(id) { return add(id, 'people-placement', 'Place the communities', 'Place each community in its historical region. Use location evidence, not clothing or appearance.', { items: [item('inca', 'Inca'), item('taino', 'Taíno')], zones: [item('caribbean', 'Caribbean islands'), item('andes', 'Andes · South America')], matches: { inca: 'andes', taino: 'caribbean' } }, ['island-people', 'andean-people'], 'The region pedestals settle into their map sockets.', 'Consult “People of the Caribbean” and “An Andean archive.”'); }
function dateLock(id, year = 1492) { return add(id, 'combo', 'The date cylinders', year === 1492 ? 'Determine the year of Columbus’s first Caribbean arrival. Then set all four cylinders.' : 'Determine the year the Treaty of Tordesillas was signed. Then set all four cylinders.', { target: year, min: 0, max: 9999, step: 1, tolerance: 0, digits: 4, unit: 'year' }, [year === 1492 ? 'first-contact' : 'treaty-date'], 'The date cylinders align and the archive bolt retracts.', 'Use the notebook’s timeline evidence. The calculation field and the cylinders must agree.'); }
function rotate(id, target = 135) { return add(id, 'rotation', 'The compass mechanism', target === 135 ? 'The gate drive requires 3/8 of one clockwise turn from north. Calculate the angle, then rotate the arm to that angle.' : 'The passage faces west. Determine its clockwise bearing from north, then align the compass arm.', { target, min: 0, max: 360, step: 1, tolerance: 2, wrap: true, unit: 'degrees' }, ['rotation-rule'], 'The compass arm rotates to your bearing and drives the passage gear.', 'One full turn is 360°. North is 0° and the bearing increases clockwise.'); }
function lever(id, treaty = false) { return add(id, 'lever', 'The sponsor lever', treaty ? 'Which crown joined Spain in signing the Treaty of Tordesillas?' : 'Which nation sponsored Vasco da Gama’s 1497–1498 voyage?', { items: [item('spain', 'Spain'), item('france', 'France'), item('portugal', 'Portugal')], solution: ['portugal'] }, [treaty ? 'treaty-date' : 'port-voyage'], 'The selected nation’s lever lowers and engages the route gear.', 'Consult the matching treaty or voyage field note.'); }
function timeline(id) { return add(id, 'timeline', 'The chronological rail', 'Arrange the events from earliest to latest to engage the archive gears.', { items: [item('arrival-india', 'Da Gama reaches India · 1498'), item('caribbean', 'Columbus reaches the Caribbean · 1492'), item('depart', 'Da Gama leaves Lisbon · 1497'), item('treaty', 'Treaty of Tordesillas · 1494')], solution: ['caribbean', 'treaty', 'depart', 'arrival-india'] }, ['first-contact', 'treaty-date', 'port-voyage'], 'The timeline plaques align and the rail slides open.', 'Compare the four years. Move the earliest event to the first position.'); }
function route(id) { return add(id, 'map-route', 'Trace the expedition', 'Place the main waypoints of da Gama’s outward voyage in order: start in Lisbon, round southern Africa, and finish in India.', { items: [item('lisbon', 'Lisbon', { x: 51, y: 18 }), item('caribbean', 'Caribbean', { x: 19, y: 45 }), item('cape', 'Southern Africa', { x: 62, y: 80 }), item('india', 'India', { x: 88, y: 43 })], solution: ['lisbon', 'cape', 'india'] }, ['port-voyage'], 'Your plotted route lights the sea lane and pulls the map-room gate open.', 'This is a schematic route map. The expedition rounded Africa on its way to India.'); }
const main = [
  [sort('shore-crates'), rotate('shore-angle')],
  [tech('workshop-tools'), rotate('workshop-bearing', 270)],
  [timeline('port-timeline')],
  [sort('market-origins'), add('market-capacity', 'cargo', 'Crisis · a damaged recovery cart', 'The cart held 240 kg. Damage reduces capacity by 25%. Calculate its new limit, then load the 62 kg operative and the 78 kg archive case. Choose which optional supplies can come along.', { capacity: 180, unit: 'kg', items: [item('operative', 'Operative', { mass: 62 }), item('archive', 'Archive case', { mass: 78 }), item('tools', 'Repair tools', { mass: 25 }), item('spare', 'Spare equipment', { mass: 40 })], requiredItems: ['operative', 'archive'] }, ['capacity-rule'], 'The balanced recovery cart rolls onto the bridge with your chosen load.', 'First find 75% of 240. Both the operative and archive case must cross; supplies are optional.')],
  [route('voyage-route'), lever('voyage-sponsor'), add('voyage-scale', 'measurement', 'Measure the hidden passage', 'The recovery blueprint measures 7.5 cm. Its scale is 1 cm : 4 m. Calculate the real distance, then extend the route to that length.', { target: 30, min: 0, max: 60, step: 1, tolerance: 0, unit: 'm' }, ['scale-rule'], 'The route extends to your measured distance and the team crosses the passage.', 'Multiply blueprint centimetres by metres per centimetre.')],
  [people('archive-people')],
  [dateLock('treaty-cylinders', 1494), add('treaty-evidence', 'evidence-board', 'Build the evidence board', 'Connect each confirmed detail to the kind of historical claim it can test.', { items: [item('date', 'Signed in 1494'), item('instrument', 'Harrison marine timekeeper'), item('crop', 'Maize origin'), item('group', 'Inca in the Andes')], zones: [item('timeline', 'Timeline'), item('technology', 'Technology'), item('exchange', 'Animals / plants'), item('people', 'People / place')], matches: { date: 'timeline', instrument: 'technology', crop: 'exchange', group: 'people' } }, ['treaty-date', 'marine-clock', 'exchange-origins', 'andean-people'], 'The evidence links pull four seals into alignment.', 'Decide what each concrete detail tells you: when, what tool, where a crop began, or who lived in a region.')],
  [dateLock('vault-date'), rotate('vault-compass', 270), sort('vault-exchange'), add('vault-nation', 'lever', 'The final treaty lever', 'Select the crown that signed the Treaty of Tordesillas alongside Portugal.', { items: [item('england', 'England'), item('spain', 'Spain'), item('france', 'France')], solution: ['spain'] }, ['treaty-date'], 'The final lever lowers. Concentric rings align and the recovery vault opens.', 'Use the treaty evidence you confirmed in the previous room.')],
];
const chambers = [];
function scene(id, title, date, location, briefing, layout, frame, correctIndex, details, facts) {
  const index = chambers.length;
  const paintings = details.map((d, i) => {
    const authentic = i === correctIndex;
    const hotspotId = `${id}-detail-${i}`;
    const contextId = `${id}-context-${i}`;
    const painting = { id: `${id}-painting-${i}`, title: ['The morning study', 'The collector’s scene', 'The light beyond'][i], image: asset + 'paintings-v1.png', artFrame: frame, caption: `${location} · ${date}. ${d[0]}`, authentic,
      hotspots: [{ id: hotspotId, label: d[1], detail: d[2], symbol: d[3], x: 65, y: 62 }, { id: contextId, label: 'Setting inscription', detail: `This reconstruction claims to depict ${location} in ${date}. Inspect the scene details against the field notes.`, symbol: '⌖', x: 24, y: 25 }] };
    if (!authentic) { const recoveryLockId = d[5](`${id}-recovery-${i}`); painting.fraud = { category: d[4], hotspotId, recoveryLockId, explanation: d[6] }; }
    return painting;
  });
  chambers.push({ id, title, date, location, briefing, layout, paintings, lockIds: main[index], factIds: facts });
}
scene('shore', 'The first encounter', '1492', 'Hispaniola · Caribbean', 'Three reconstructions tell a different story of the same shore. Find the scene whose details fit the place and time.', 'gallery', 0, 1, [
  ['A settlement and its livestock.', 'Established horse herds', 'The scene detail shows horse herds already kept by the island community before European arrival.', '♞', 'animal-plant', sort, 'Horses were introduced from the Old World after contact. Established pre-contact European horse herds cannot belong in this scene.'],
  ['A canoe beside local gardens.', 'Maize and a dugout canoe', 'The scene detail shows maize from the Americas and a dugout canoe used by an island community.', '✦'],
  ['A community named on the frame.', 'Inca island settlement', 'The inscription identifies this Hispaniola community as the Inca of the Andes.', '⌂', 'people', people, 'The Inca belonged to the Andes; a label identifying Hispaniola’s community as an Inca settlement misplaces the group.'],
], ['first-contact', 'island-people', 'exchange-origins']);
scene('workshop', 'The navigator’s workshop', '1500', 'Portugal', 'A convincing instrument can still be centuries too early. Inspect the instrument study attached to each painting.', 'workshop', 1, 2, [
  ['A navigator checks an instrument.', 'Reflecting sextant', 'The instrument study labels the navigator’s device as a reflecting sextant.', '◔', 'technology', tech, 'The reflecting sextant belongs to the eighteenth century, not a workshop in 1500.'],
  ['A device keeps time at sea.', 'Harrison marine timekeeper', 'A Harrison-style marine timekeeper is catalogued on the desk.', '◷', 'technology', tech, 'Harrison’s marine timekeepers were eighteenth-century developments and cannot belong on this desk in 1500.'],
  ['The tools of an ocean voyage.', 'Compass and astrolabe', 'The instrument study identifies a magnetic compass and a mariner’s astrolabe.', '⊕'],
], ['navigation-tools', 'marine-clock']);
scene('port', 'Departure from the port', '1497', 'Lisbon', 'The port register identifies da Gama’s departure. Compare the labels with the expedition record.', 'port', 2, 0, [
  ['An outward-bound expedition.', 'Portuguese expedition · 1497', 'The register identifies da Gama’s Portuguese expedition departing Lisbon in 1497.', '⚑'],
  ['A date in the departure register.', 'Departure dated 1607', 'The attached register says this is da Gama’s first departure for India in 1607.', '◷', 'timeline', timeline, 'Da Gama departed for his first voyage to India in 1497. A register dating that same departure to 1607 is false.'],
  ['A sponsor named on the manifest.', 'French-sponsored fleet', 'The manifest calls da Gama’s first India expedition a French-sponsored fleet.', '⚑', 'people', lever, 'Da Gama’s expedition was sponsored by Portugal, not France; the manifest identifies the wrong national group.'],
], ['port-voyage', 'first-contact', 'treaty-date']);
scene('market', 'Cargo across the Atlantic', 'After 1492', 'Atlantic exchange market', 'The crates carry origin labels. Separate where goods began from where they later travelled. Then respond to a damaged recovery cart.', 'cargo', 3, 1, [
  ['An origin tag on a crate.', 'Potatoes · European origin', 'The potato crate is labelled as a European-origin crop introduced to the Americas.', '✦', 'animal-plant', sort, 'Potatoes originated in the Americas. This crate reverses their origin and exchange direction.'],
  ['Two carefully labelled shipments.', 'Maize from Americas · wheat from Old World', 'The cargo labels place maize in the Americas and wheat in the Old World before exchange.', '✦'],
  ['A livestock origin record.', 'Horses · pre-contact Caribbean origin', 'The shipment label identifies European horses as native to pre-contact Caribbean communities.', '♞', 'animal-plant', sort, 'The horse record is false: European horses reached the Americas from the Old World after contact.'],
], ['exchange-origins']);
scene('voyage', 'The explorer’s route hall', '1497–1498', 'Lisbon to India', 'The route is part of the evidence. Inspect the voyage annotation before committing to a sea lane.', 'map', 4, 2, [
  ['A date annotation on the map.', 'India arrival · 1492', 'The map dates da Gama’s first arrival in India to 1492.', '◷', 'timeline', timeline, 'Da Gama’s first arrival in India was in 1498, so the 1492 annotation does not fit this voyage.'],
  ['A national seal on the route.', 'English expedition', 'The map attributes da Gama’s expedition to an English-sponsored crew.', '⚑', 'people', lever, 'This was a Portuguese expedition; the national attribution is incorrect.'],
  ['The expedition’s route annotation.', 'Portugal · around Africa · India 1498', 'The map identifies the Portuguese voyage from Lisbon around southern Africa to India in 1498.', '⌖'],
], ['port-voyage']);
scene('archive', 'The Indigenous encounter archive', 'Before European contact', 'Andes · South America', 'Read the place and community labels carefully. Historical identity comes from evidence, not a guess about how people look.', 'archive', 5, 0, [
  ['An Andean community and its animals.', 'Inca terraces and llamas', 'The catalogue identifies Inca stone terraces and Andean llamas.', '⌂'],
  ['A community named in the catalogue.', 'Taíno Caribbean settlement', 'The catalogue identifies the Andean mountain settlement as a Taíno Caribbean island community.', '⌂', 'people', people, 'The catalogue confuses an Andean Inca setting with a Caribbean Taíno community.'],
  ['A livestock detail in the record.', 'European horses before contact', 'The detail study lists established European horse herds in this pre-contact Andean settlement.', '♞', 'animal-plant', sort, 'European horses were introduced after contact; they cannot already be established in this pre-contact setting.'],
], ['andean-people', 'island-people']);
scene('treaty', 'The treaty and empire room', '1494', 'Tordesillas', 'Test the treaty date and the parties named on its seals. A European claim was not consent from the people who already lived in the claimed lands.', 'treaty', 6, 1, [
  ['A date below the signatures.', 'Treaty signed · 1607', 'The date plaque identifies the Treaty of Tordesillas as signed in 1607.', '◷', 'timeline', id => dateLock(id, 1494), 'The Treaty of Tordesillas was signed in 1494, not 1607.'],
  ['Two crowns on the document.', 'Spain and Portugal · 1494', 'The document identifies the agreement between Spain and Portugal in 1494.', '⚑'],
  ['The other signatory’s seal.', 'Spain and France', 'The signatory label names Spain and France as the parties to this treaty.', '⚑', 'people', id => lever(id, true), 'Portugal, not France, was the other party alongside Spain in the Treaty of Tordesillas.'],
], ['treaty-date']);
scene('vault', 'The cartographer’s vault', '1492', 'Caribbean collection', 'One last composite scene. Authenticate it, then combine the date, compass, cargo and treaty evidence to release the collection.', 'vault', 7, 2, [
  ['An instrument catalogued beside the coast.', 'Marine timekeeper in 1492', 'The composite catalogue includes a Harrison-style marine timekeeper in the 1492 scene.', '◷', 'technology', tech, 'A Harrison-style marine timekeeper is centuries too late for the scene’s 1492 date.'],
  ['A community named on the coastal record.', 'Inca Caribbean village', 'The coastal community in the Caribbean is identified as an Inca settlement.', '⌂', 'people', people, 'This attribution moves the Inca from the Andes into a Caribbean island community.'],
  ['A scene with compatible details.', 'Caribbean canoe · maize · 1492', 'A Caribbean canoe, maize from the Americas and the arrival date 1492 fit together without the other records’ anachronisms.', '✦'],
], ['first-contact', 'exchange-origins', 'island-people']);
// Image variants carry visible factual differences; caption frauds retain matching scene art.
for (const [chamberId, paintingIndex, image, frame] of [
  ['shore', 0, 'frauds-v1.png', 0], ['shore', 2, 'paintings-v1.png', 5],
  ['workshop', 0, 'frauds-v1.png', 1], ['workshop', 1, 'frauds-v1.png', 2],
  ['archive', 1, 'paintings-v1.png', 0], ['archive', 2, 'frauds-v1.png', 3],
  ['vault', 0, 'frauds-v1.png', 8], ['vault', 1, 'paintings-v1.png', 5],
]) { const painting = chambers.find(c => c.id === chamberId).paintings[paintingIndex]; painting.image = asset + image; painting.artFrame = frame; }
chambers.forEach((chamber, i) => { if (i < chambers.length - 1) chamber.next = chambers[i + 1].id; });
const mission = { schemaVersion: '1.1', experience: 'gallery', projectId: 'shadow-gallery', projectVersion: '1.0.0', template: { id: 'heist', version: '1.0' }, title: 'The Cartographer’s Vault', subtitle: 'An Age of Exploration art heist', subject: 'hybrid', briefing: 'A collection of historical scenes has been mixed with convincing frauds. Recover the authentic records. Follow the evidence through eight galleries, operate the mechanisms, and bring the collection safely home.', environment: asset + 'gallery-v1.png', entry: 'shore', chambers, locks, evidence, defensePrompts: ['Which concrete clue was most useful for exposing a fraud? Explain the evidence.', 'Which historical mistake was easiest to miss, and how did you resolve it?', 'How can a convincing image or caption misrepresent history?'] };
mkdirSync(dir, { recursive: true });
writeFileSync(new URL('project.json', dir), JSON.stringify(mission, null, 2) + '\n');
console.log(`Created ${chambers.length} galleries, ${locks.length} academic locks and ${evidence.length} source notes.`);
