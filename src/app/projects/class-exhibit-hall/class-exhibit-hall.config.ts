import type {
  ExhibitProjectConfig,
  ExhibitVideoPresentation,
  ImmersiveGalleryEmbed,
  MuseumBoardObject,
  MuseumBoardSnapshotData,
  MuseumBoardSource,
} from '../../templates/exhibit-hall/domain/exhibit-types';
import { museumBoardTemplate } from '../../templates/exhibit-hall/renderers/museum-board/museum-board-template';

const METASTEPS_EGYPTIAN_HALL =
  'https://metasteps.com/viewer/embed/baac88b7-b37f-49c0-90d6-83caf06218a6?showSignIn=0&showCommunications=0&showOrbitButton=0&showSettingsButton=0&showSoundButton=0&showLikeButton=0&forceOrbitCamera=0';

const source = (id: string, citation: string): MuseumBoardSource => ({ id, citation });

const artifact = (
  id: string,
  title: string,
  description: string,
  evidenceConnection: string,
  sourceIds: readonly string[],
): MuseumBoardObject => ({ id, title, description, evidenceConnection, sourceIds });

const galleryWing = (title: string): ImmersiveGalleryEmbed => ({
  provider: 'metasteps',
  title,
  embedUrl: METASTEPS_EGYPTIAN_HALL,
});

const prototypeVideo = (title: string, presenterLabel: string): ExhibitVideoPresentation => ({
  title,
  presenterLabel,
  prototype: true,
});

const board = (
  title: string,
  centralClaim: string,
  displayName: string,
  objects: readonly MuseumBoardObject[],
  sources: readonly MuseumBoardSource[],
  themeVariant: string,
  memberDisplayNames: readonly string[],
  immersiveGallery: ImmersiveGalleryEmbed,
  videoPresentation: ExhibitVideoPresentation,
): MuseumBoardSnapshotData => ({
  title,
  centralClaim,
  objects,
  sources,
  immersiveGallery,
  videoPresentation,
  teamCredit: { displayName, memberDisplayNames },
  themeVariant,
});

export const egyptianExhibitGallery = galleryWing('Egyptian Exhibit · Shared MetaSteps Hall');

export const classExhibitHallConfig: ExhibitProjectConfig = {
  schemaVersion: '1.0',
  projectId: 'objects-that-changed-us',
  projectVersion: '2.1.0',
  projectInstanceId: 'egyptian-artifacts-period-3-prototype',
  courseSectionId: 'ancient-civilizations-5-period-3',
  classLabel: 'Ancient Civilizations · Period 3',
  title: 'Objects That Changed Us: Ancient Egypt',
  subtitle:
    'Each student or group researches an Egyptian artifact collection, builds one wing of a shared MetaSteps museum, and records a video tour for classmates and families.',
  openingLabel: 'Egyptian Museum Showcase · Student & Family Walkthrough',
  creatorMode: 'individual_or_group',
  template: museumBoardTemplate,
  teams: [
    {
      id: 'team-atlas',
      displayName: 'Nile Life Curators',
      memberIds: ['student-avery', 'student-jo', 'student-mateo'],
      memberDisplayNames: ['Avery', 'Jo', 'Mateo'],
      locationId: 'alcove-01',
    },
    {
      id: 'team-marigold',
      displayName: 'Scribes & Power Curators',
      memberIds: ['student-lina', 'student-sam', 'student-noor'],
      memberDisplayNames: ['Lina', 'Sam', 'Noor'],
      locationId: 'alcove-02',
    },
    {
      id: 'team-northstar',
      displayName: 'Afterlife Curators',
      memberIds: ['student-emery', 'student-kai', 'student-zuri'],
      memberDisplayNames: ['Emery', 'Kai', 'Zuri'],
      locationId: 'alcove-03',
    },
    {
      id: 'team-ember',
      displayName: 'Builders & Engineers',
      memberIds: ['student-ivy', 'student-max', 'student-rene'],
      memberDisplayNames: ['Ivy', 'Max', 'René'],
      locationId: 'alcove-04',
    },
  ],
  seedBoards: [
    {
      teamId: 'team-atlas',
      published: true,
      corridorPreview: {
        imageUrl: '/exhibit-hall/nile-life-3d.png',
        imageAlt:
          'AI-generated prototype diorama of a museum case with a painted jar, folded linen, and a harvesting sickle beside the Nile.',
        walkUpAvailable: true,
      },
      data: board(
        'Life Along the Nile',
        'Tools and household objects show how farming, skilled craft, and the Nile shaped everyday life in ancient Egypt.',
        'Nile Life Curators',
        [
          artifact(
            'nile-storage-jar',
            'Painted storage jar',
            'A pottery vessel could hold grain, oil, or other supplies; its material and decoration also reveal the choices of skilled makers.',
            'The jar connects food storage and craft specialization to settled life along the Nile.',
            ['nile-source-1'],
          ),
          artifact(
            'nile-linen',
            'Linen textile fragment',
            'Plant fibers were spun and woven into linen used for clothing and many other purposes.',
            'The fragment links agriculture to the specialized labor needed to turn flax into cloth.',
            ['nile-source-1', 'nile-source-2'],
          ),
          artifact(
            'nile-sickle',
            'Harvesting sickle',
            'A curved harvesting tool represents one stage in gathering cereal crops grown in irrigated fields.',
            'Its shape helps visitors connect technology, seasonal work, and the food supply.',
            ['nile-source-2'],
          ),
        ],
        [
          source(
            'nile-source-1',
            'The Metropolitan Museum of Art collection essays and object records.',
          ),
          source(
            'nile-source-2',
            'British Museum collection records on daily life and agriculture in ancient Egypt.',
          ),
        ],
        'ochre',
        ['Avery', 'Jo', 'Mateo'],
        galleryWing('MetaSteps Wing 1 · Life Along the Nile'),
        prototypeVideo('How these artifacts reveal everyday life', 'Nile Life Curators'),
      ),
    },
    {
      teamId: 'team-marigold',
      published: true,
      corridorPreview: {
        imageUrl: '/exhibit-hall/scribes-power-3d.png',
        imageAlt:
          'AI-generated prototype diorama of a museum case with a scribal palette, reed pens, a seal, and a carved stela fragment.',
        walkUpAvailable: false,
      },
      data: board(
        'Words, Records, and Royal Power',
        'Writing tools and inscribed objects show how information moved through ancient Egyptian government, religion, and public memory.',
        'Scribes & Power Curators',
        [
          artifact(
            'scribe-palette',
            'Scribal palette',
            'A palette held writing tools and pigments used by trained scribes to create records and inscriptions.',
            'It makes the specialized knowledge behind administration and written communication visible.',
            ['scribe-source-1'],
          ),
          artifact(
            'scribe-seal',
            'Seal impression',
            'A stamped seal could identify an office, official, or controlled container.',
            'The impression shows how a small object could carry authority and verify control.',
            ['scribe-source-2'],
          ),
          artifact(
            'scribe-stela',
            'Inscribed stela fragment',
            'Carved text and images presented selected people, events, or offerings for an intended audience.',
            'The fragment raises questions about who created public messages and whose perspective they preserved.',
            ['scribe-source-1', 'scribe-source-2'],
          ),
        ],
        [
          source(
            'scribe-source-1',
            'The Metropolitan Museum of Art resources on writing and scribes.',
          ),
          source(
            'scribe-source-2',
            'British Museum object records for seals and inscribed stelae.',
          ),
        ],
        'indigo',
        ['Lina', 'Sam', 'Noor'],
        galleryWing('MetaSteps Wing 2 · Scribes and Power'),
        prototypeVideo('Reading power through writing objects', 'Scribes & Power Curators'),
      ),
    },
    {
      teamId: 'team-northstar',
      published: true,
      corridorPreview: {
        imageUrl: '/exhibit-hall/afterlife-3d.png',
        imageAlt:
          'AI-generated prototype diorama of a museum case with a turquoise scarab, a shabti figure, and a canopic jar.',
        walkUpAvailable: false,
      },
      data: board(
        'Preparing for the Afterlife',
        'Funerary artifacts show that ancient Egyptian beliefs about the afterlife were expressed through materials, images, texts, and ritual preparation.',
        'Afterlife Curators',
        [
          artifact(
            'afterlife-scarab',
            'Heart scarab',
            'A carved scarab could be placed with the deceased and connected to protection and judgment in the afterlife.',
            'Its inscriptions and burial context show how belief could be carried by a small personal object.',
            ['afterlife-source-1'],
          ),
          artifact(
            'afterlife-shabti',
            'Shabti figure',
            'A small human-shaped figure was made for a tomb and associated with work in the afterlife.',
            'The figure gives material form to expectations about duties and continued existence after death.',
            ['afterlife-source-1', 'afterlife-source-2'],
          ),
          artifact(
            'afterlife-canopic',
            'Canopic jar',
            'Specialized containers were connected to preserving the body during mummification and burial.',
            'The vessel links religious belief to the skilled practices used in funerary preparation.',
            ['afterlife-source-2'],
          ),
        ],
        [
          source(
            'afterlife-source-1',
            'The Metropolitan Museum of Art resources on Egyptian funerary objects.',
          ),
          source(
            'afterlife-source-2',
            'British Museum collection records on mummification and burial.',
          ),
        ],
        'sage',
        ['Emery', 'Kai', 'Zuri'],
        galleryWing('MetaSteps Wing 3 · Beliefs and the Afterlife'),
        prototypeVideo('What funerary artifacts can—and cannot—tell us', 'Afterlife Curators'),
      ),
    },
    {
      teamId: 'team-ember',
      published: true,
      corridorPreview: {
        imageUrl: '/exhibit-hall/builders-3d.png',
        imageAlt:
          'AI-generated prototype diorama of a museum case with a cubit rod, a plumb bob, a chisel, and shaped stone blocks.',
        walkUpAvailable: false,
      },
      data: board(
        'Measuring and Building',
        'Measuring and construction tools reveal the planning, repeated labor, and practical knowledge behind ancient Egyptian buildings and monuments.',
        'Builders & Engineers',
        [
          artifact(
            'builder-cubit',
            'Cubit rod',
            'A marked measuring rod helped builders compare lengths using a shared system.',
            'It shows that consistent measurement was essential when many people contributed to one structure.',
            ['builder-source-1'],
          ),
          artifact(
            'builder-plumb',
            'Plumb bob',
            'A suspended weight helps establish a vertical line during construction.',
            'The simple tool demonstrates how builders translated observation into precise decisions.',
            ['builder-source-1', 'builder-source-2'],
          ),
          artifact(
            'builder-chisel',
            'Copper-alloy chisel',
            'A metal cutting tool represents the repeated skilled work involved in shaping construction material.',
            'Its wear can help researchers investigate tools, labor, repair, and material limits.',
            ['builder-source-2'],
          ),
        ],
        [
          source(
            'builder-source-1',
            'The Metropolitan Museum of Art resources on Egyptian measurement and construction.',
          ),
          source(
            'builder-source-2',
            'University College London resources on ancient Egyptian technology.',
          ),
        ],
        'rose',
        ['Ivy', 'Max', 'René'],
        galleryWing('MetaSteps Wing 4 · Builders and Engineers'),
        prototypeVideo('How tool evidence changes the monument story', 'Builders & Engineers'),
      ),
    },
  ],
  viewer: {
    studentId: 'student-avery',
    studentDisplayName: 'Avery',
    teamId: 'team-atlas',
    teacherId: 'teacher-morgan',
    teacherDisplayName: 'Ms. Morgan',
  },
};
