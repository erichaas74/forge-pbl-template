import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-quiz-break', standalone: true,
  template: `
    <section class="break"><div class="eyebrow">COMMERCIAL BREAK? BETTER.</div><h2>A very unserious intermission.</h2><p>Everybody plays. No points. No grades. Just a breath before the next big question.</p>
      <nav aria-label="Quiz break games">@for (game of games; track game.id) { <button [attr.aria-pressed]="selected() === game.id" (click)="choose(game.id)">{{ game.name }}</button> }</nav>
      @if (selected() === 'zoom') {
        <div class="mystery" [class.revealed]="revealed()"><img [src]="image()" alt="" /><div class="image-label">{{ revealed() ? 'IT WAS A DUCK. OBVIOUSLY.' : 'MYSTERY ZOOM · WHAT ARE WE LOOKING AT?' }}</div></div>
        <div class="answers">@for (answer of ['A very confident duck', 'A tiny submarine', 'The principal’s spaceship']; track answer) { <button (click)="guess(answer)">{{ answer }}</button> }</div>
        @if (revealed()) { <p role="status">{{ response() }} The answer is a rubber duck in sunglasses. Your dignity remains intact.</p><button (click)="revealed.set(false)">Zoom back in</button> }
      } @else if (selected() === 'wrong') {
        <div class="comedy-card"><small>WRONG ANSWERS ONLY</small><h3>Why did the calculator join the band?</h3><p>Give the most ridiculous explanation you can defend with a completely straight face.</p></div>
        <div class="answers">@for (answer of ['It had excellent algorithm and blues.', 'It wanted to play the decimal drums.', 'It could always count on the bass player.']; track answer) { <button (click)="response.set(answer)">{{ answer }}</button> }</div>
        @if (response()) { <p role="status">Audience choice: “{{ response() }}” Applause is the only scoring system.</p> }
      } @else {
        <div class="comedy-card"><small>FIVE-SECOND FREEZE FRAME</small><h3>{{ poses[pose()] }}</h3><p>Count down together: 5… 4… 3… 2… 1… freeze! Play seated or standing; passing is always fine.</p></div>
        <button (click)="pose.set((pose() + 1) % poses.length)">Deal another ridiculous pose</button>
      }
    </section>`,
  styles: [`
    .break{padding:2.4rem;background:#0e1929;border:1px solid #34465e;color:#ecf1f8;border-radius:8px}.eyebrow,small{color:#efce86;letter-spacing:3px;font-size:10px}h2{font-size:32px;font-weight:500;margin:12px 0}p{color:#bdcce0;line-height:1.65}nav,.answers{display:flex;gap:8px;flex-wrap:wrap;margin:1rem 0}button{background:#17283d;border:1px solid #526680;color:#f1f5fa;padding:12px 16px;border-radius:5px;font:inherit;font-size:12px;cursor:pointer;min-height:44px}button[aria-pressed=true]{background:#efce86;color:#102033}button:focus-visible{outline:3px solid white;outline-offset:3px}.mystery{position:relative;aspect-ratio:16/7;overflow:hidden;background:#060e1d;border-radius:6px;margin-top:20px}.mystery img{width:100%;height:100%;object-fit:cover;transform:scale(5);transform-origin:50% 42%;transition:transform 1.7s cubic-bezier(.2,.7,.2,1)}.mystery.revealed img{transform:scale(1)}.image-label{position:absolute;bottom:0;left:0;right:0;padding:16px;text-align:center;background:#07101be8;font-size:11px;letter-spacing:2px;color:#f5dca9}.comedy-card{padding:2.5rem;text-align:center;border:1px solid #6e5b34;margin:1.5rem 0;background:radial-gradient(ellipse at top,#26344b,#0a1423)}h3{font-size:clamp(23px,3vw,38px);font-weight:500;line-height:1.3}@media(prefers-reduced-motion:reduce){.mystery img{transition:none}}@media(max-width:650px){.break{padding:1rem}.mystery{aspect-ratio:4/3}.comedy-card{padding:1rem}}
  `],
})
export class QuizBreakComponent implements OnInit {
  readonly initialGame = input('zoom');
  readonly image = input.required<string>(); readonly selected = signal('zoom'); readonly revealed = signal(false); readonly response = signal(''); readonly pose = signal(0);
  readonly games = [{ id: 'zoom', name: 'Mystery Zoom' }, { id: 'wrong', name: 'Wrong Answers Only' }, { id: 'pose', name: 'Victory Pose Freeze' }];
  readonly poses = ['A robot who just won a science fair.', 'A penguin presenting a very serious budget.', 'A superhero who has discovered a remainder.'];
  ngOnInit(): void { this.choose(this.initialGame()); }
  choose(id: string): void { this.selected.set(id); this.response.set(''); }
  guess(answer: string): void { this.response.set(`You chose: ${answer}.`); this.revealed.set(true); }
}
