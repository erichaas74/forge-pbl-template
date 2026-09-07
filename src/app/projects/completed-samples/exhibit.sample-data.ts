import { classExhibitHallConfig } from '../class-exhibit-hall/class-exhibit-hall.config';
import type {
  ExhibitCuratorRecord,
  HallLocationView,
  MuseumBoardSnapshotData,
} from '../../templates/exhibit-hall/domain/exhibit-types';
import type { SampleGuide } from '../../shared/project-intro/completed-sample-guide';

export function createExhibitSample(): HallLocationView[] {
  return classExhibitHallConfig.seedBoards.map((seed, index) => {
    // Use the same supplied models and source credits as the project’s published collections.
    const { immersiveGallery: _embed, videoPresentation: _prototype, ...original } = seed.data;
    const data: MuseumBoardSnapshotData = {
      ...original,
    };
    const team = classExhibitHallConfig.teams.find((item) => item.id === seed.teamId)!;
    const id = 'sample-wing-' + index;
    const snapshotId = id + '-v2';
    return {
      locationId: team.locationId,
      position: index,
      team,
      hanging: {
        id,
        hallId: 'sample-museum',
        locationId: team.locationId,
        artifactId: id,
        currentSnapshotId: snapshotId,
        publishedBy: 'sample-curator',
        publishedAt: '2026-04-16T14:00:00.000Z',
      },
      snapshot: {
        id: snapshotId,
        artifactId: id,
        version: 2,
        rendererType: 'museum-board',
        rendererVersion: 1,
        visitorSafeData: data,
        accessibleData: {
          title: data.title,
          summary: data.centralClaim,
          sections: data.objects.map((object) => ({
            heading: object.title,
            body: object.description + ' ' + object.evidenceConnection,
            sourceLinks: data.sources
              .filter((source) => object.sourceIds.includes(source.id))
              .map((source) => ({ label: source.citation, url: source.url! })),
          })),
        },
        createdBy: 'sample-curator',
        createdAt: '2026-04-16T14:00:00.000Z',
      },
    };
  });
}
export const exhibitCurators: readonly ExhibitCuratorRecord[] = [
  {
    hangingId: 'sample-wing-0',
    initialClaim: 'These objects tell us how everyone lived.',
    feedback: 'Can a royal image and a funerary ensemble represent every household?',
    revision:
      'We now compare shaped forms and decoration, and limit our claim to the supplied examples.',
    reflection:
      'Avery: I can describe visible features, but I need source records to establish materials and original context.',
    transcript:
      'Welcome to Materials and Skilled Making. Compare the mummy cartonnage and coffin with the model of Nefertiti’s bust. Rotate each one and describe a visible shape or decorated surface before offering an interpretation. Our first claim treated exceptional objects as evidence of everyone’s life. We revised it to focus on craft and representation. The supplied models help us look closely, while the creator records provide a starting point for checking what the digital versions represent. A model alone cannot establish the original materials or the lives of every maker.',
  },
  {
    hangingId: 'sample-wing-1',
    initialClaim: 'Royal images prove that everyone supported the ruler.',
    feedback: 'Can a portrait or a temple show what every viewer believed?',
    revision: 'We separated the presentation of authority from evidence of people’s reactions.',
    reflection:
      'Lina: The bust and temple help me ask how images and spaces communicate, but they do not establish public agreement.',
    transcript:
      'Our wing pairs Nefertiti’s bust with a digital interpretation of the Temple of Horus. Inspect the portrait’s profile, then explore the temple’s arrangement of spaces. These models let us compare how an image and a building can direct attention. We do not claim they came from the same moment or prove what every person believed. The temple asset is a game-ready reconstruction, so its details need checking against archaeological records. Our revised claim concerns the presentation of authority, with the limits of the digital evidence made explicit.',
  },
  {
    hangingId: 'sample-wing-2',
    initialClaim: 'These coffins prove everyone believed exactly the same thing.',
    feedback: 'Can two surviving funerary examples establish what every person believed?',
    revision:
      'We now describe funerary forms and decoration while acknowledging the limits of surviving burial evidence.',
    reflection: 'Emery: I changed “everyone” to a narrower claim that these examples can support.',
    transcript:
      'Compare the Coffin of Ankh-Khonsu with the supplied mummy cartonnage and coffin. Rotate the models to observe the relationship between shape and decorated surfaces. These examples help us discuss funerary preparation and the work involved in making an enclosure. Our first claim was too broad: two surviving examples cannot establish what everyone in Egypt believed or how every burial was prepared. We distinguish observation from interpretation and use the linked museum model records as a starting point for further research.',
  },
  {
    hangingId: 'sample-wing-3',
    initialClaim: 'Large buildings and small enclosures require the same methods.',
    feedback: 'Does a similar shape establish a shared material or construction technique?',
    revision:
      'We compare scale and organization without assuming identical methods or original materials.',
    reflection:
      'Ivy: I can compare an entrance with an enclosure, but I need further evidence to explain exactly how each original was built.',
    transcript:
      'Measuring and Building compares the Temple of Horus model with the Coffin of Ankh-Khonsu. One organizes spaces that people could move through; the other is an enclosure at a very different scale. Rotate each model and identify repeated forms, edges, and openings. These observations support questions about planning and skilled work, but do not prove which tools or methods were used. The temple is a digital reconstruction. We use the creator and museum records to keep the representation separate from claims about original construction.',
  },
];
export const exhibitSampleGuide: SampleGuide = {
  title: 'The Museum Is Open',
  subtitle:
    'Four student-curated wings. Four supplied 3D models. Step into the class museum and discover how a label becomes an argument.',
  audience: 'Social studies · Grade 5',
  duration: 'Explore in 2–3 minutes',
  trail: [
    {
      label: 'Challenge',
      title: 'Tell a story through objects.',
      text: 'Each team compared two supplied 3D objects and built a claim about life, power, belief, or technology.',
      evidence: 'All four corridor wings open into the existing museum-board presentation.',
    },
    {
      label: 'Evidence',
      title: 'Every object has a job.',
      text: 'Description explains the object; “Why it matters” connects it to the central claim. Sources remain available to visitors.',
      evidence:
        'Eight object labels across four paired collections and each wing’s Sources section.',
    },
    {
      label: 'Feedback',
      title: 'A claim can be too big.',
      text: 'The Afterlife Curators first claimed that everyone believed exactly the same thing. Feedback challenged what two surviving funerary examples can establish.',
      evidence: 'Teacher view → Preparing for the Afterlife.',
    },
    {
      label: 'Revision',
      title: 'The tour explains the limit.',
      text: 'The completed curator transcript narrows the claim and distinguishes reconstruction from archaeological evidence.',
      evidence: 'Curator tour transcript, revised claim, and individual reflection.',
    },
  ],
  review: {
    strength:
      'Objects are selected to support a shared idea, and the team explains the link instead of simply decorating the wing.',
    question: 'If you removed one object, what part of your central claim would lose support?',
    revision: 'Broad statements become bounded claims with explicit evidence and source limits.',
    assessment:
      'Assess historical explanation, source use, curation, and individual reasoning. A polished gallery alone does not establish mastery.',
  },
};
