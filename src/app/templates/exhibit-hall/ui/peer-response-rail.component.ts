import { Component, input, output } from '@angular/core';

import { wordCount } from '../core/artifact-validator';
import type { PeerResponse } from '../domain/exhibit-types';

@Component({
  selector: 'app-peer-response-rail',
  templateUrl: './peer-response-rail.component.html',
  styleUrl: './peer-response-rail.component.scss',
})
export class PeerResponseRailComponent {
  readonly prompt = input.required<string>();
  readonly responseName = input('response');
  readonly maxWords = input(40);
  readonly responses = input.required<readonly PeerResponse[]>();
  readonly draft = input('');
  readonly canRespond = input(false);
  readonly teacherMode = input(false);
  readonly draftChanged = output<string>();
  readonly draftBlurred = output<void>();
  readonly posted = output<string>();
  readonly moderated = output<{ responseId: string; action: 'hide' | 'restore' }>();

  words(value: string): number {
    return wordCount(value);
  }

  readValue(event: Event): string {
    return (event.target as HTMLTextAreaElement).value;
  }
}
