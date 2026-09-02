import type { BaseEntity } from '../../../core/models/base-entity';
import type { RuntimeEvent } from '../../../core/events/runtime-event';
import type { RuntimeStateSnapshot } from '../domain/runtime-state';

export interface DialogueNode {
  id: string;
  studentPrompt: string;
  response: string;
  availabilityRuleIds?: string[];
  actionIds?: string[];
  evidenceProducedIds?: string[];
}

export interface NPCDefinition extends BaseEntity {
  characterType: string;
  role?: string;
  avatarAssetRef?: string;
  studentVisibleBio?: string;
  teacherNotes?: string;
  dialogueNodes?: DialogueNode[];
  initialState?: Record<string, unknown>;
}

export interface ScriptedNPCContract {
  npcId: string;
  getAvailableDialogue(runtime: RuntimeStateSnapshot): DialogueNode[];
  selectDialogue(dialogueId: string): RuntimeEvent;
}

