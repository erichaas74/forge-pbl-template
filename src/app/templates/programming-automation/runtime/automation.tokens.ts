import { InjectionToken } from '@angular/core';
import type { ProjectSessionContext } from '../../../core/context/project-session-context';
import type { AutomationProjectConfig } from '../domain/automation.models';
export const AUTOMATION_CONFIG = new InjectionToken<AutomationProjectConfig>('AUTOMATION_CONFIG');
export const AUTOMATION_SESSION = new InjectionToken<ProjectSessionContext>('AUTOMATION_SESSION');
export const AUTOMATION_SAMPLE = new InjectionToken<boolean>('AUTOMATION_SAMPLE');
