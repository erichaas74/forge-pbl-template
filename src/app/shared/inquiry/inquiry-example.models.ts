/** Read-only worked examples: viewing never changes progress or assessment state. */
export interface InquiryExample {
  readonly capabilityId: 'learning.worked-example';
  readonly version: '1.0';
  readonly id: string;
  readonly lesson: number;
  readonly title: string;
  readonly summary: string;
  readonly attribution: string;
  readonly videoUrl: string;
  readonly posterUrl: string;
  readonly captionsUrl: string;
  readonly durationSeconds: number;
  readonly sourceIds: readonly string[];
  readonly lookFors: readonly string[];
  readonly chapters: readonly { label: string; text: string; startSeconds: number }[];
}

export function validateInquiryExamples(
  examples: readonly InquiryExample[],
  evidenceIds: readonly string[],
): void {
  const fail = (): never => {
    throw new Error(
      'INQUIRY_EXAMPLE_INVALID: Check the lesson, media, captions, transcript, and source references.',
    );
  };
  const safeAsset = (value: string) =>
    typeof value === 'string' &&
    /^\/(?!\/)[a-zA-Z0-9/_\-.]+$/.test(value) &&
    !value.split('/').includes('..');
  if (new Set(examples.map((e) => e.id)).size !== examples.length) fail();
  for (const example of examples) {
    if (
      example.capabilityId !== 'learning.worked-example' ||
      example.version !== '1.0' ||
      !/^[a-z0-9][a-z0-9-]*$/.test(example.id) ||
      !Number.isInteger(example.lesson) ||
      example.lesson < 1 ||
      example.lesson > 8 ||
      ![example.title, example.summary, example.attribution].every(
        (v) => typeof v === 'string' && v.trim(),
      ) ||
      ![example.videoUrl, example.posterUrl, example.captionsUrl].every(safeAsset) ||
      !Number.isFinite(example.durationSeconds) ||
      example.durationSeconds <= 0 ||
      !example.sourceIds.length ||
      example.sourceIds.some((id) => !evidenceIds.includes(id)) ||
      !example.lookFors.length ||
      example.lookFors.some((v) => !v.trim()) ||
      !example.chapters.length
    )
      fail();
    for (const [i, chapter] of example.chapters.entries()) {
      if (
        !chapter.label.trim() ||
        !chapter.text.trim() ||
        !Number.isFinite(chapter.startSeconds) ||
        chapter.startSeconds < 0 ||
        chapter.startSeconds >= example.durationSeconds ||
        (i === 0 && chapter.startSeconds !== 0) ||
        (i > 0 && chapter.startSeconds <= example.chapters[i - 1].startSeconds)
      )
        fail();
    }
  }
}
