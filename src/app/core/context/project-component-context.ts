import type { PermissionSet } from '../permissions/permission-contracts';
import type { RegistryView } from '../registries/registry-contracts';
import type { CapabilityRegistration } from '../registries/registration-contracts';

export interface AccessibilitySettings {
  reducedMotion?: boolean;
  highContrast?: boolean;
  textScale?: number;
}

export interface ProjectComponentContext<TRuntimeState = unknown> {
  tenantId: string;
  projectId: string;
  projectVersion: string;
  attemptId?: string;
  studentId?: string;
  teamId?: string;
  classId?: string;
  mode: 'student' | 'teacher' | 'preview';
  permissions: PermissionSet;
  runtime: TRuntimeState;
  capabilities: RegistryView<CapabilityRegistration>;
  locale?: string;
  accessibility?: AccessibilitySettings;
}
