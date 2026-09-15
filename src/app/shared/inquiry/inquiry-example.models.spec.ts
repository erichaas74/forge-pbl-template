import { describe, expect, it } from 'vitest';
import { expeditionExamples } from '../../projects/expedition-news-network/expedition-examples';
import { validateInquiryExamples, type InquiryExample } from './inquiry-example.models';

const example = expeditionExamples[0];
describe('Worked example content validation', () => {
  it('accepts the captioned launch and final models with credited sources', () => {
    expect(() =>
      validateInquiryExamples(expeditionExamples, [
        'primary-preparation',
        'chronology',
        'route',
        'archive-photo',
      ]),
    ).not.toThrow();
  });
  it.each<Partial<InquiryExample>>([
    { captionsUrl: '' },
    { videoUrl: '//another-host/video.mp4' },
    { sourceIds: ['missing-source'] },
    { lesson: 9 },
    { chapters: [{ label: 'Beyond the video', text: 'Transcript', startSeconds: 1000 }] },
    {
      chapters: [
        { label: 'First', text: 'Transcript', startSeconds: 0 },
        { label: 'Second', text: 'Transcript', startSeconds: 0 },
      ],
    },
  ])('rejects incomplete, unsafe, or mismatched media content: %j', (change) => {
    expect(() => validateInquiryExamples([{ ...example, ...change }], example.sourceIds)).toThrow(
      'INQUIRY_EXAMPLE_INVALID',
    );
  });
});
