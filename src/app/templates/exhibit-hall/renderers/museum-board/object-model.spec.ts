import { classExhibitHallConfig } from '../../../../projects/class-exhibit-hall/class-exhibit-hall.config';
import { egyptianObjectModels } from '../../../../projects/class-exhibit-hall/egyptian-object-models';
import { MuseumBoardAdapter, validateMuseumBoard } from './museum-board-adapter';
import { museumBoardTemplate } from './museum-board-template';
import { isExhibitObjectModel } from '../../../../shared/media/object-model';

describe('museum board 3D model contract', () => {
  it('uses all four supplied models, credits each one, and replaces generated object pictures', () => {
    expect(egyptianObjectModels).toHaveLength(4);
    expect(egyptianObjectModels.every((object) => isExhibitObjectModel(object.model))).toBe(true);
    const objects = classExhibitHallConfig.seedBoards.flatMap((seed) => seed.data.objects);
    expect(new Set(objects.map((object) => object.model!.src)).size).toBe(4);
    expect(objects.every((object) => object.model && !object.imageAssetId)).toBe(true);
    expect(classExhibitHallConfig.seedBoards.every((seed) => !seed.corridorPreview)).toBe(true);
  });
  it('preserves model metadata through notebook composition and rejects malformed models', () => {
    const board = classExhibitHallConfig.seedBoards[0].data;
    const result = new MuseumBoardAdapter().compose({
      projectInstanceId: 'test',
      teamId: 'test',
      slots: {
        'exhibit-title': board.title,
        'central-claim': board.centralClaim,
        'selected-objects': board.objects,
        'source-list': board.sources,
        'team-credit': board.teamCredit,
        'immersive-gallery': board.immersiveGallery,
        'video-presentation': board.videoPresentation,
      },
    });
    expect(result.validation.valid).toBe(true);
    expect(result.data!.objects[0].model).toEqual(board.objects[0].model);
    expect(result.data!.objects[0].model).not.toBe(board.objects[0].model);
    for (const src of ['javascript:alert(1).glb', '//other.example/model.glb', '/model.usdz']) {
      const invalid = {
        ...board,
        objects: [
          { ...board.objects[0], model: { ...board.objects[0].model!, src } },
          board.objects[1],
        ],
      };
      expect(
        validateMuseumBoard(museumBoardTemplate, invalid).errors.some(
          (error) => error.fieldId === 'selected-objects',
        ),
      ).toBe(true);
    }
    const legacy = { ...board, objects: board.objects.map(({ model, ...object }) => object) };
    expect(validateMuseumBoard(museumBoardTemplate, legacy).valid).toBe(true);
  });
});
