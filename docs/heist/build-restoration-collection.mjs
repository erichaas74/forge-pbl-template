import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const sourceGallery = JSON.parse(fs.readFileSync(path.join(root, 'public/projects/shadow-gallery/versions/1.1.0/project.json'), 'utf8'));
const asset = name => `/projects/shadow-gallery/restoration/${name}-v1.png`;
const text = (id, label, copy, tool = 'relabel') => ({ id, label, tool, text: copy, description: copy });
const keep = copy => text('original', 'Keep this detail', copy, 'keep');
const remove = { id: 'remove', label: 'Lift out the added object', tool: 'remove', description: 'Remove this object layer and reveal the underlying scene.' };
const compass = { id: 'compass', label: 'Paint in a magnetic compass', tool: 'replace', image: asset('compass'), description: 'Replace the added instrument with an illustrated magnetic compass.' };
const specs = [
  ['shore', 0, 'The horses on the shore', '1492 · before European arrival', 'Hispaniola, Caribbean', 0, 'exchange-origins', 'horse-herd', 'Established European horse herds before contact', null, 'A Caribbean island community', 'island-people'],
  ['shore', 2, 'Whose island story?', '1492', 'Hispaniola, Caribbean', 0, 'island-people', null, 'Inca settlement · Hispaniola', 'Taíno community · Hispaniola', 'Maize originated in the Americas', 'exchange-origins'],
  ['workshop', 0, 'An instrument out of time', '1500', 'Portugal', 1, 'navigation-tools', 'sextant', 'A reflecting sextant in a workshop in 1500', null, 'A magnetic compass fits this period', 'navigation-tools'],
  ['workshop', 1, 'The clock that arrived early', '1500', 'Portugal', 1, 'marine-clock', 'marine-clock', 'A Harrison-style marine timekeeper in 1500', null, 'A mariner’s astrolabe fits this period', 'navigation-tools'],
  ['port', 1, 'The departure register', '1497', 'Lisbon, Portugal', 2, 'port-voyage', null, 'Da Gama’s first India voyage\nDeparture: 1607', 'Da Gama’s first India voyage\nDeparture: 1497', 'Departure port: Lisbon', 'port-voyage'],
  ['port', 2, 'The sponsor’s seal', '1497', 'Lisbon, Portugal', 2, 'port-voyage', null, 'Da Gama’s first India voyage\nSponsor: France', 'Da Gama’s first India voyage\nSponsor: Portugal', 'First departure for India: 1497', 'port-voyage'],
  ['market', 0, 'The potato crate', 'After 1492', 'Atlantic exchange market', 3, 'exchange-origins', null, 'Potatoes · origin: Europe', 'Potatoes · origin: Americas', 'Wheat originated in the Old World', 'exchange-origins'],
  ['market', 2, 'The livestock record', 'After 1492', 'Atlantic exchange market', 3, 'exchange-origins', null, 'European horses · origin:\npre-contact Caribbean', 'European horses · from the Old World\nIntroduced after contact', 'Maize originated in the Americas', 'exchange-origins'],
  ['voyage', 0, 'The arrival annotation', '1497–1498', 'Voyage from Lisbon to India', 4, 'port-voyage', null, 'Da Gama’s first India arrival: 1492', 'Da Gama’s first India arrival: 1498', 'Route: around southern Africa', 'port-voyage'],
  ['voyage', 1, 'The expedition’s identity', '1497–1498', 'Voyage from Lisbon to India', 4, 'port-voyage', null, 'Da Gama’s expedition: English', 'Da Gama’s expedition: Portuguese', 'Arrival: Calicut (Kozhikode), India', 'port-voyage'],
  ['archive', 1, 'A name in the wrong landscape', 'Before European contact', 'Andes, South America', 5, 'andean-people', null, 'Taíno community · Andes', 'Inca community · Andes', 'Inca homelands: the Andes', 'andean-people'],
  ['archive', 2, 'The animals on the terrace', 'Before European contact', 'Andes, South America', 5, 'exchange-origins', 'horse-herd', 'Established European horse herds in the pre-contact Andes', null, 'Inca homelands: the Andes', 'andean-people'],
  ['treaty', 0, 'The treaty’s date', '1494', 'Treaty of Tordesillas', 6, 'treaty-date', null, 'Treaty of Tordesillas\nSigned: 1607', 'Treaty of Tordesillas\nSigned: 7 June 1494', 'The treaty did not erase Indigenous sovereignty', 'treaty-date'],
  ['treaty', 2, 'The names at the table', '1494', 'Treaty of Tordesillas', 6, 'treaty-date', null, 'Signing crowns: Spain and France', 'Signing crowns: Spain and Portugal', 'Indigenous peoples remained present', 'treaty-date'],
  ['vault', 0, 'The clock beside the canoe', '1492', 'Caribbean coast', 7, 'marine-clock', 'marine-clock', 'A Harrison-style marine timekeeper on the coast in 1492', null, 'Maize originated in the Americas', 'exchange-origins'],
  ['vault', 1, 'The final coastal inscription', '1492', 'Caribbean coast', 7, 'island-people', null, 'Inca settlement · Caribbean', 'Taíno community · Caribbean', 'Inca homelands: the Andes', 'andean-people'],
];
const works = specs.map(([chamberId, index, title, date, location, frame, evidenceId, object, wrong, correction, valid, validSource]) => {
  const chamber = sourceGallery.chambers.find(c => c.id === chamberId);
  const painting = chamber.paintings[index];
  const original = object ? { id: 'original', tool: 'keep', label: 'Keep the added object', description: wrong, image: asset(object) } : keep(wrong);
  const options = object ? [original, remove, ...(object !== 'horse-herd' ? [compass] : [])] : [original, text('corrected', 'Rewrite the inscription', correction), text('erase', 'Leave an empty label', 'Identity / date / origin unknown')];
  return { id: `${painting.id}-restoration`, type: 'layered-painting', paintingId: painting.id, chamberId, ...(chamberId === 'shore' ? { encounterId: 'coastal-encounter' } : {}), title, collection: chamber.title, date, location,
    commission: `Reconstruct this study for ${location}, ${date}. Check both marked details. Repair what the evidence contradicts and preserve what it supports. Keep the assigned time and place fixed.`,
    attribution: 'Illustrated classroom reconstruction with editable object and inscription layers. It is not a surviving historical painting or a record of a specific person. Community identity is established from sources and place, never inferred from appearance.',
    image: { src: '/projects/shadow-gallery/paintings-v1.webp', frame, grid: 3 }, imageAlt: `Illustrated study of ${location}, with two inspectable restoration layers.`,
    regions: [
      { id: 'detail', title: object ? 'The added object' : 'The disputed inscription', claim: wrong, instruction: object ? 'Could this object belong in the assigned time and place? Keep, remove, or replace it, then justify your choice.' : 'Read the claim painted onto the label. Which wording fits the evidence? Change the label itself.',
        x: object ? 36 : 8, y: object ? 44 : 67, width: object ? 59 : 84, height: object ? 43 : 22, originalOptionId: 'original', options,
        evidenceIds: [...new Set([evidenceId, ...(object && object !== 'horse-herd' ? ['navigation-tools'] : []), 'first-contact', 'treaty-date'])],
        hint: painting.fraud.explanation + ' Match your source and its relationship to the original claim, then explain the change in your own words.',
        answers: (object ? ['remove', ...(object !== 'horse-herd' ? ['compass'] : [])] : ['corrected']).map(optionId => ({ optionId, evidenceId, relationship: 'contradicts' })) },
      { id: 'context', title: 'The supporting detail', claim: valid, instruction: 'A careful restorer does not change everything. Check this detail and decide whether to preserve it.',
        x: 5, y: 5, width: 78, height: 13, originalOptionId: 'original', options: [keep(valid), text('unknown', 'Mark it as unknown', 'Historical context unknown')],
        evidenceIds: [...new Set([validSource, 'first-contact', 'rotation-rule'])], hint: 'Check whether the reference supports the original statement. A supported detail can stay in your reconstruction.',
        answers: [{ optionId: 'original', evidenceId: validSource, relationship: 'supports' }] },
    ] };
});
const mission = { schemaVersion: '1.0', experience: 'restoration', projectId: sourceGallery.projectId, projectVersion: '2.0.0', template: sourceGallery.template,
  title: 'The Cartographer’s Vault', subtitle: 'Restore the paintings. Recover their stories.',
  briefing: 'Someone has rewritten this collection’s history. Become a student conservator: investigate each forgery, enter a story where a portal is available, and rebuild the image using evidence. Your original, repairs, sources, and reasoning become a living restoration ledger.',
  heistBriefing: 'Your restoration work has prepared you for the final recovery. Use the ledger and reference desk to operate five mechanisms, then bring the collection into the exhibition. There is no countdown: this is a challenge of evidence and careful decisions.',
  sourceGallery, works, finalLockIds: ['vault-date', 'vault-compass', 'vault-exchange', 'vault-nation', 'market-capacity'] };
const destination = path.join(root, 'public/projects/shadow-gallery/versions/2.0.0');
fs.mkdirSync(destination, { recursive: true }); fs.writeFileSync(path.join(destination, 'project.json'), JSON.stringify(mission, null, 2) + '\n');
console.log(`Wrote ${works.length} restoration commissions.`);
