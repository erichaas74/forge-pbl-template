import { modelCollection, modelSources } from './egyptian-object-models';
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
  projectVersion: '2.2.0',
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
      displayName: 'Material & Craft Curators',
      memberIds: ['student-avery', 'student-jo', 'student-mateo'],
      memberDisplayNames: ['Avery', 'Jo', 'Mateo'],
      locationId: 'alcove-01',
    },
    {
      id: 'team-marigold',
      displayName: 'Royal Image Curators',
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
      data: board(
        'Materials and Skilled Making',
        'A funerary ensemble and a royal bust invite comparison of shaped forms, decoration, and the skilled work behind ancient Egyptian objects.',
        'Material & Craft Curators',
        modelCollection('cartonnage', 'nefertiti'),
        modelSources('cartonnage', 'nefertiti'),
        'ochre',
        ['Avery', 'Jo', 'Mateo'],
        galleryWing('MetaSteps Wing 1 · Materials and Skilled Making'),
        prototypeVideo(
          'How form and decoration reveal skilled making',
          'Material & Craft Curators',
        ),
      ),
    },
    {
      teamId: 'team-marigold',
      published: true,
      data: board(
        'Royal Images and Sacred Spaces',
        'A royal portrait and a temple model help us explore how images and spaces could make authority visible.',
        'Royal Image Curators',
        modelCollection('nefertiti', 'temple'),
        modelSources('nefertiti', 'temple'),
        'indigo',
        ['Lina', 'Sam', 'Noor'],
        galleryWing('MetaSteps Wing 2 · Royal Images and Sacred Spaces'),
        prototypeVideo('Reading power through images and spaces', 'Royal Image Curators'),
      ),
    },
    {
      teamId: 'team-northstar',
      published: true,
      data: board(
        'Preparing for the Afterlife',
        'Funerary artifacts show that ancient Egyptian beliefs about the afterlife were expressed through materials, images, texts, and ritual preparation.',
        'Afterlife Curators',
        modelCollection('coffin', 'cartonnage'),
        modelSources('coffin', 'cartonnage'),
        'sage',
        ['Emery', 'Kai', 'Zuri'],
        galleryWing('MetaSteps Wing 3 · Beliefs and the Afterlife'),
        prototypeVideo('What funerary artifacts can—and cannot—tell us', 'Afterlife Curators'),
      ),
    },
    {
      teamId: 'team-ember',
      published: true,
      data: board(
        'Measuring and Building',
        'A temple and a coffin invite comparison of construction at different scales, from organized spaces to a shaped enclosure.',
        'Builders & Engineers',
        modelCollection('temple', 'coffin'),
        modelSources('temple', 'coffin'),
        'rose',
        ['Ivy', 'Max', 'René'],
        galleryWing('MetaSteps Wing 4 · Builders and Engineers'),
        prototypeVideo('Comparing construction at different scales', 'Builders & Engineers'),
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
