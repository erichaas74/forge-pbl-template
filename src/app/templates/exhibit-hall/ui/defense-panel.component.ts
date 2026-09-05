import { Component, effect, input, output, signal } from '@angular/core';

import type { DefensePrompt } from '../domain/exhibit-types';

@Component({
  selector: 'app-defense-panel',
  templateUrl: './defense-panel.component.html',
  styleUrl: './defense-panel.component.scss',
})
export class DefensePanelComponent {
  readonly prompts = input.required<readonly DefensePrompt[]>();
  readonly fallbackChallenge = input<string | undefined>(undefined);
  readonly initialAnswers = input<Readonly<Record<string, string>>>({});
  readonly alreadySubmitted = input(false);
  readonly closed = output<void>();
  readonly draftSaved = output<{
    answers: Readonly<Record<string, string>>;
    mode: 'live' | 'makeup';
  }>();
  readonly submitted = output<{
    answers: Readonly<Record<string, string>>;
    mode: 'live' | 'makeup';
  }>();
  readonly answers = signal<Record<string, string>>({});
  readonly mode = signal<'live' | 'makeup'>('live');

  constructor() {
    effect(() => this.answers.set({ ...this.initialAnswers() }));
  }

  update(promptId: string, event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.answers.update((answers) => ({ ...answers, [promptId]: value }));
  }

  save(): void {
    this.draftSaved.emit({ answers: this.answers(), mode: this.mode() });
  }

  submit(): void {
    this.submitted.emit({ answers: this.answers(), mode: this.mode() });
  }
}
