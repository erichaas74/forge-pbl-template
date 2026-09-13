import { Component, effect, input, OnInit, signal } from '@angular/core';

export const QUIZ_GAMES = [{ id: 'odd', name: 'Odd One Out' }, { id: 'wrong', name: 'Sell Me This!' }, { id: 'pose', name: 'Reaction Cam' }];

@Component({
  selector: 'app-quiz-break', standalone: true,
  template: `
    <section class="break"><div class="eyebrow">COMMERCIAL BREAK? BETTER.</div><h2>A very unserious intermission.</h2><p>Everybody plays. No points. No grades. Just a breath before the next big question.</p>
      @if (showGamePicker()) { <nav aria-label="Quiz break games">@for (game of games; track game.id) { <button [attr.aria-pressed]="selected() === game.id" (click)="choose(game.id)">{{ game.name }}</button> }</nav> }
      @if (selected() === 'odd') {
        <div class="comedy-card"><small>ODD ONE OUT · DEFEND YOUR RIDICULOUS CHOICE</small><h3>{{ oddRounds[oddRound()].prompt }}</h3>
          <div class="odd-cards">@for (item of oddRounds[oddRound()].items; track item.label) { <button [class.odd-reveal]="revealed() && item.label === oddRounds[oddRound()].answer" (click)="guess(item.label)"><span aria-hidden="true">{{ item.icon }}</span><strong>{{ item.label }}</strong></button> }</div>
          @if (revealed()) { <p class="punchline" role="status">{{ response() }} {{ oddRounds[oddRound()].punchline }}</p> }
        </div>
        <button (click)="nextOddRound()">Another odd lineup</button>
      } @else if (selected() === 'wrong') {
        <div class="comedy-card"><small>SELL ME THIS! · ONE RIDICULOUS SENTENCE</small><h3>{{ pitches[pitch()].name }}</h3><p>Pitch this invention like it is the greatest thing ever made. The audience supplies the applause.</p>
          @if (response()) { <p class="punchline" role="status">“{{ response() }}”</p> }
        </div>
        <div class="answers"><button (click)="response.set(pitches[pitch()].tagline)">Reveal the terrible sales pitch</button><button (click)="nextPitch()">Deal another invention</button></div>
      } @else {
        <div class="comedy-card"><small>REACTION CAM · {{ frozen() ? 'FREEZE!' : '3… 2… 1…' }}</small><h3>{{ poses[pose()] }}</h3><p>Give us your most dramatic silent reaction. Play seated or standing; passing is always fine.</p>
          @if (frozen()) { <p class="punchline" role="status">FREEZE! That belongs on the highlight reel.</p> }
        </div>
        <div class="answers"><button (click)="frozen.set(true)">Freeze the reaction</button><button (click)="nextPose()">Deal another reaction</button></div>
      }
    </section>`,
  styles: [`
    .odd-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:800px;margin:24px auto}.odd-cards button{min-height:160px;display:grid;place-content:center;gap:16px;background:linear-gradient(145deg,#2d4260,#101b2b);border:1px solid #7185a0;box-shadow:0 14px 25px #0003}.odd-cards span{font-size:64px;line-height:1.1}.odd-cards strong{font-size:16px}.odd-cards button.odd-reveal{border-color:#edc875;background:linear-gradient(145deg,#655128,#292013);box-shadow:0 0 35px #edc87533}.punchline{color:#ffe1a0!important;font-size:20px!important}@media(max-width:650px){.odd-cards{gap:6px}.odd-cards span{font-size:38px}.odd-cards strong{font-size:11px}.odd-cards button{padding:10px 5px;min-height:115px}}
    .break{padding:2.4rem;background:#0e1929;border:1px solid #34465e;color:#ecf1f8;border-radius:8px}.eyebrow,small{color:#efce86;letter-spacing:3px;font-size:10px}h2{font-size:32px;font-weight:500;margin:12px 0}p{color:#bdcce0;line-height:1.65}nav,.answers{display:flex;gap:8px;flex-wrap:wrap;margin:1rem 0}button{background:#17283d;border:1px solid #526680;color:#f1f5fa;padding:12px 16px;border-radius:5px;font:inherit;font-size:12px;cursor:pointer;min-height:44px}button[aria-pressed=true]{background:#efce86;color:#102033}button:focus-visible{outline:3px solid white;outline-offset:3px}.mystery{position:relative;aspect-ratio:16/7;overflow:hidden;background:#060e1d;border-radius:6px;margin-top:20px}.mystery img{width:100%;height:100%;object-fit:cover;transform:scale(5);transform-origin:50% 42%;transition:transform 1.7s cubic-bezier(.2,.7,.2,1)}.mystery.revealed img{transform:scale(1)}.image-label{position:absolute;bottom:0;left:0;right:0;padding:16px;text-align:center;background:#07101be8;font-size:11px;letter-spacing:2px;color:#f5dca9}.comedy-card{padding:2.5rem;text-align:center;border:1px solid #6e5b34;margin:1.5rem 0;background:radial-gradient(ellipse at top,#26344b,#0a1423)}h3{font-size:clamp(23px,3vw,38px);font-weight:500;line-height:1.3}@media(prefers-reduced-motion:reduce){.mystery img{transition:none}}@media(max-width:650px){.break{padding:1rem}.mystery{aspect-ratio:4/3}.comedy-card{padding:1rem}}
  `],
})
export class QuizBreakComponent implements OnInit {
  readonly initialGame = input('odd'); readonly showGamePicker = input(true);
  readonly autoplay = input(false);
  readonly pitch = signal(0); readonly frozen = signal(false);
  readonly selected = signal('odd'); readonly revealed = signal(false); readonly response = signal(''); readonly pose = signal(0);
  readonly games = QUIZ_GAMES; readonly oddRound = signal(0);
  readonly oddRounds = [
    { prompt: 'Who packed the school bag?', items: [{ icon: '✏️', label: 'Pencil' }, { icon: '📓', label: 'Notebook' }, { icon: '🍕', label: 'Loose pizza' }], answer: 'Loose pizza', punchline: 'The pizza. Excellent at fractions. Terrible at keeping your homework clean.' },
    { prompt: 'One of these is not on the teaching staff.', items: [{ icon: '🦖', label: 'T. rex' }, { icon: '🧑‍🏫', label: 'Teacher' }, { icon: '👩‍🔬', label: 'Science teacher' }], answer: 'T. rex', punchline: 'The T. rex. Great attendance roar. Cannot reach the whiteboard.' },
    { prompt: 'Which trophy needs a refrigerator?', items: [{ icon: '🏆', label: 'Gold cup' }, { icon: '🧀', label: 'Cheese trophy' }, { icon: '🥇', label: 'Gold medal' }], answer: 'Cheese trophy', punchline: 'The cheese trophy. Finally, a victory you can grate.' },
  ];
  readonly pitches = [
    { name: 'The Homework-Eating Backpack', tagline: 'Finally, a school bag that takes your excuses seriously.' },
    { name: 'The Remote-Control Recess Button', tagline: 'One click. Unlimited playground. Batteries mysteriously missing.' },
    { name: 'The Emergency Applause Machine', tagline: 'For every time you open a yogurt without spilling it.' },
  ];
  readonly poses = ['You just discovered the trophy is made of cheese.', 'Your calculator has requested a holiday.', 'You won… but your victory dance is still buffering.'];
  constructor() {
    effect(onCleanup => {
      const active = this.autoplay(); const game = this.selected(); const pitch = this.pitch(); this.pose(); this.oddRound();
      if (!active) return;
      const timer = setTimeout(() => {
        if (game === 'odd') this.revealed.set(true);
        else if (game === 'wrong') this.response.set(this.pitches[pitch].tagline);
        else this.frozen.set(true);
      }, 1600);
      onCleanup(() => clearTimeout(timer));
    });
  }
  ngOnInit(): void { this.choose(this.initialGame()); }
  choose(id: string): void { this.selected.set(id); this.response.set(''); this.revealed.set(false); this.frozen.set(false); }
  nextPitch(): void { this.pitch.update(value => (value + 1) % this.pitches.length); this.response.set(''); }
  nextPose(): void { this.pose.update(value => (value + 1) % this.poses.length); this.frozen.set(false); }
  nextOddRound(): void { this.oddRound.update(value => (value + 1) % this.oddRounds.length); this.revealed.set(false); this.response.set(''); }
  guess(answer: string): void { this.response.set(`You chose: ${answer}.`); this.revealed.set(true); }
}
