import { isExhibitDraft } from './exhibit-draft-validation';
import { classExhibitHallConfig } from '../../../projects/class-exhibit-hall/class-exhibit-hall.config';

describe('editable exhibit storage', () => {
  const board = classExhibitHallConfig.seedBoards[0].data;
  it('accepts complete starters and intentionally incomplete learner drafts', () => {
    expect(isExhibitDraft(board)).toBe(true);
    expect(
      isExhibitDraft({ ...board, title: '', centralClaim: '', objects: [], sources: [] }),
    ).toBe(true);
  });
  it('rejects malformed fields instead of crashing the editor after reload', () => {
    expect(isExhibitDraft({ ...board, title: null })).toBe(false);
    expect(isExhibitDraft({ ...board, objects: [{ ...board.objects[0], description: 42 }] })).toBe(
      false,
    );
    expect(isExhibitDraft({ ...board, sources: [{}] })).toBe(false);
  });
});
