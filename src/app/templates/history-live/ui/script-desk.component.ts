import { Component, inject } from '@angular/core';

import type { ScriptBlockType } from '../domain/history-live.models';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';

@Component({
  selector: 'app-history-live-script-desk',
  templateUrl: './script-desk.component.html',
  styleUrl: './script-desk.component.scss',
})
export class ScriptDeskComponent {
  readonly runtime = inject(HistoryLiveRuntimeService);
  readonly blockTypes: readonly ScriptBlockType[] = [
    'ON CAMERA',
    'VOICEOVER',
    'SHOW MAP',
    'SHOW SOURCE',
    'SHOW QUOTE',
    'TRANSITION',
    'LOWER THIRD',
    'REPORTER CLOSE',
  ];

  updateText(blockId: string, event: Event): void {
    this.runtime.updateScriptBlock(blockId, (event.target as HTMLTextAreaElement).value);
  }

  updateType(blockId: string, event: Event): void {
    this.runtime.setScriptBlockType(
      blockId,
      (event.target as HTMLSelectElement).value as ScriptBlockType,
    );
  }
}
