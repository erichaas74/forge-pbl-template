import { requireTimeRepairConfig } from './time-repair.validation';
import type { TimeRepairConfig } from './time-repair.models';
import { requireInventionProject } from '../invention/invention.validation';
import type { InventionProject } from '../invention/invention.models';

export type TimeRepairPackage = TimeRepairConfig | InventionProject;
export function isInventionProject(value: TimeRepairPackage): value is InventionProject {
  return 'inventionRescue' in value;
}
/** Additive template 1.1 package variant; template 1.0 retains its original contract. */
export function requireTimeRepairPackage(value: unknown): TimeRepairPackage {
  return value && typeof value === 'object' && 'inventionRescue' in value
    ? requireInventionProject(value)
    : requireTimeRepairConfig(value);
}
