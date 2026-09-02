import type { BaseEntity } from '../../core/models/base-entity';

export interface LessonDefinition extends BaseEntity {
  contentRef?: string;
  required?: boolean;
}

