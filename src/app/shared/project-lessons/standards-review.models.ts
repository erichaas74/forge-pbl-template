export interface LessonStandardTarget {
  readonly standardId: string;
  readonly addressed: string;
  readonly evidence: string;
  /** An explicit missing activity/check, not a claim that it already exists. */
  readonly addition?: string;
}

export interface ProjectStandardsReview {
  readonly projectId: string;
  readonly projectVersion: string;
  readonly planVersion: string;
  readonly grade: 4 | 5 | 6;
  readonly scope: string;
  readonly lessons: readonly {
    readonly number: number;
    readonly targets: readonly LessonStandardTarget[];
  }[];
}

export interface ForgeReviewStandard {
  readonly id: string;
  readonly grade: number;
  readonly title: string;
  readonly description: string;
  readonly sourceFile: string;
}

/** An exact shared-standard connection to another configured curriculum lesson. */
export interface StandardCurriculumConnection {
  readonly standardId: string;
  readonly projectId: string;
  readonly projectTitle: string;
  readonly lessonNumber: number;
  readonly lessonTitle: string;
  readonly addressed: string;
}
