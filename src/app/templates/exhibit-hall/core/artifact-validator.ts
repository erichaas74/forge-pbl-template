import type { ArtifactValidationResult, ExhibitTemplateDefinition } from '../domain/exhibit-types';

export type ExhibitFieldAccessor<TData> = (data: TData, fieldId: string) => unknown;

export class ArtifactValidator {
  validate<TData>(
    template: ExhibitTemplateDefinition,
    data: TData,
    readField: ExhibitFieldAccessor<TData>,
  ): ArtifactValidationResult {
    const errors: Array<{ fieldId: string; message: string; focusTarget?: string }> = [];
    const warnings: Array<{ fieldId?: string; message: string }> = [];

    for (const requirement of template.requirements) {
      const value = readField(data, requirement.fieldId);
      const itemCount = Array.isArray(value) ? value.length : undefined;
      const text = typeof value === 'string' ? value.trim() : '';

      const missing =
        value === undefined ||
        value === null ||
        (typeof value === 'string' && text.length === 0) ||
        (itemCount !== undefined && itemCount === 0);
      if (requirement.required && missing) {
        errors.push({
          fieldId: requirement.fieldId,
          message: `${humanize(requirement.fieldId)} is required.`,
          focusTarget: `[data-field-id="${requirement.fieldId}"]`,
        });
        continue;
      }
      if (
        itemCount !== undefined &&
        requirement.minItems !== undefined &&
        itemCount < requirement.minItems
      ) {
        errors.push({
          fieldId: requirement.fieldId,
          message: `${humanize(requirement.fieldId)} needs at least ${requirement.minItems} items.`,
          focusTarget: `[data-field-id="${requirement.fieldId}"]`,
        });
      }
      if (
        itemCount !== undefined &&
        requirement.maxItems !== undefined &&
        itemCount > requirement.maxItems
      ) {
        errors.push({
          fieldId: requirement.fieldId,
          message: `${humanize(requirement.fieldId)} allows no more than ${requirement.maxItems} items.`,
          focusTarget: `[data-field-id="${requirement.fieldId}"]`,
        });
      }
      if (text.length > 0 && requirement.maxWords !== undefined) {
        const words = wordCount(text);
        if (words > requirement.maxWords) {
          errors.push({
            fieldId: requirement.fieldId,
            message: `${humanize(requirement.fieldId)} is ${words} words; the limit is ${requirement.maxWords}.`,
            focusTarget: `[data-field-id="${requirement.fieldId}"]`,
          });
        }
      }
    }

    const sourceCount = template.requirements.find((item) => item.fieldId === 'source-list');
    if (sourceCount !== undefined && Array.isArray(readField(data, 'source-list'))) {
      const sources = readField(data, 'source-list') as readonly unknown[];
      if (sources.length === sourceCount.minItems) {
        warnings.push({
          fieldId: 'source-list',
          message:
            'Your board meets the source minimum. Add another source if a claim needs more context.',
        });
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }
}

export function wordCount(value: string): number {
  return value.trim().length === 0 ? 0 : value.trim().split(/\s+/u).length;
}

function humanize(value: string): string {
  const phrase = value.replaceAll('-', ' ');
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}
