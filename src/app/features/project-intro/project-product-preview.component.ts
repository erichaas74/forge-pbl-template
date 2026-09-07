import { Component, input } from '@angular/core';
import type { ProjectIntroConfig } from '../../shared/project-intro/project-intro.models';
import { ObjectModelViewerComponent } from '../../shared/media/object-model-viewer.component';

/** A visual invitation built from the same content as the finished-product example. */
@Component({
  selector: 'app-project-product-preview',
  imports: [ObjectModelViewerComponent],
  template: `
    <figure
      [class]="'product-preview ' + config().theme"
      aria-label="Preview of the project you will create"
    >
      <div class="canvas-top">
        <span><i></i> YOUR FUTURE FINAL PRODUCT</span><span aria-hidden="true">✦</span>
      </div>
      <div class="product-world">
        @if (config().model; as model) {
          <app-object-model-viewer [model]="model" />
        } @else if (config().image) {
          <img class="world-image" [src]="config().image" [alt]="config().imageAlt" />
          <div class="world-shade" aria-hidden="true"></div>
        }
        <span class="format-ribbon">{{ config().finalExample.format }}</span>
        <div class="world-detail" aria-hidden="true">
          <svg class="route-line" viewBox="0 0 500 200">
            <path d="M35 150 Q130 20 235 95 T465 40" />
            <circle cx="35" cy="150" r="7" />
            <circle cx="235" cy="95" r="7" />
            <circle cx="465" cy="40" r="7" />
          </svg>
          <div class="broadcast-label"><i></i> ON AIR <span>YOUR STORY. YOUR SOURCES.</span></div>
        </div>
      </div>
      <div class="artifact-sheets">
        <article class="main-sheet">
          <div class="sheet-masthead">
            <span>THE FINISHED PROJECT</span><span aria-hidden="true">01 /</span>
          </div>
          <h2>{{ config().finalExample.title }}</h2>
          <div class="ink-rule"></div>
          <p class="excerpt">{{ config().finalExample.chapters[0].studentWork }}</p>
          <footer>
            <span>YOUR IDEAS + YOUR EVIDENCE</span><span class="seal" aria-hidden="true">✦</span>
          </footer>
        </article>
        <aside class="evidence-note">
          <span class="note-pin" aria-hidden="true"></span>
          <span class="note-label">MAKE YOUR THINKING VISIBLE</span>
          <p>{{ config().finalExample.chapters[1].title }}</p>
          <div class="note-lines" aria-hidden="true"><i></i><i></i><i></i></div>
          <span class="note-signature">Made by you.</span>
        </aside>
      </div>
      <figcaption>A glimpse of the format. Your project will tell your own story.</figcaption>
    </figure>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    .product-preview {
      --product-accent: #f2c86c;
      margin: 0;
      position: relative;
      border-radius: 18px;
      padding: 18px;
      background: #173733;
      box-shadow: 0 30px 75px #071d2940;
      overflow: hidden;
    }
    .canvas-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #dce8df;
      font: 10px/1.4 system-ui;
      letter-spacing: 0.12em;
      padding: 0 4px 15px;
    }
    .canvas-top span:first-child {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .canvas-top i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--product-accent);
    }
    .product-world {
      position: relative;
      min-height: 160px;
      border-radius: 8px;
      overflow: hidden;
      background: #243a36;
    }
    .world-image {
      display: block;
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
    .world-shade {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, #08152205, #08152200 35%, #081522a0);
    }
    .format-ribbon {
      position: absolute;
      top: 14px;
      left: 14px;
      right: 14px;
      width: fit-content;
      max-width: calc(100% - 28px);
      padding: 7px 10px;
      background: #142b30ed;
      border: 1px solid #ffffff3b;
      color: #fff3d5;
      font: 11px/1.5 system-ui;
      pointer-events: none;
    }
    .world-detail {
      pointer-events: none;
    }
    .route-line,
    .broadcast-label {
      display: none;
    }
    .side-sheet {
      display: none;
    }
    .artifact-sheets {
      display: grid;
      grid-template-columns: 1fr;
      align-items: end;
      position: relative;
      margin: -38px 12px 0;
      gap: 0;
    }
    .main-sheet {
      position: relative;
      z-index: 1;
      background: #fff9e9;
      color: #203c36;
      padding: 24px;
      transform: rotate(-3deg);
      box-shadow: 0 10px 22px #0004;
    }
    .sheet-masthead {
      display: flex;
      justify-content: space-between;
      font: 8px system-ui;
      letter-spacing: 0.12em;
      gap: 15px;
    }
    h2 {
      font:
        700 clamp(21px, 2.2vw, 32px)/1.08 Georgia,
        serif;
      margin: 16px 0;
    }
    .ink-rule {
      height: 3px;
      background: #23423a;
      margin-bottom: 16px;
    }
    .excerpt {
      font:
        12px/1.7 Georgia,
        serif;
      margin: 0;
    }
    .main-sheet footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 17px;
      font: 7px system-ui;
      letter-spacing: 0.08em;
    }
    .seal {
      border: 1px solid #32695b;
      border-radius: 50%;
      width: 33px;
      height: 33px;
      display: grid;
      place-items: center;
      font-size: 19px;
    }
    .evidence-note {
      z-index: 2;
      position: relative;
      margin-left: -8px;
      margin-bottom: 15px;
      background: var(--product-accent);
      color: #263a2f;
      padding: 23px 15px 16px;
      transform: rotate(6deg);
      box-shadow: 0 10px 25px #0003;
    }
    .note-pin {
      position: absolute;
      top: 6px;
      left: 48%;
      height: 8px;
      width: 8px;
      background: #2b554b;
      border-radius: 50%;
    }
    .note-label {
      font: 7px/1.5 system-ui;
      letter-spacing: 0.09em;
    }
    .evidence-note p {
      font:
        700 16px/1.25 Georgia,
        serif;
      margin: 10px 0;
    }
    .note-lines {
      display: grid;
      gap: 5px;
      margin: 14px 0;
    }
    .note-lines i {
      display: block;
      height: 2px;
      background: #36433140;
    }
    .note-lines i:last-child {
      width: 70%;
    }
    .note-signature {
      font:
        italic 14px Georgia,
        serif;
    }
    figcaption {
      text-align: center;
      color: #c6d8d1;
      font: 10px/1.6 system-ui;
      margin: 24px 8px 2px;
    }
    .frontier {
      background: #422e24;
      --product-accent: #dfb87b;
    }
    .robotics {
      --product-accent: #79efd1;
      background: linear-gradient(150deg, #1c3b4f, #0e2133);
      border: 1px solid #517387;
      box-shadow:
        0 25px 65px #020e244f,
        inset 0 1px 0 #96deed25;
      padding: 15px;
    }
    .robotics .canvas-top {
      color: #b9d9e4;
      font-weight: 700;
    }
    .robotics .product-world {
      border: 1px solid #688699;
      background: #0d2132;
    }
    .robotics .world-image {
      height: auto;
      aspect-ratio: 3 / 2;
      object-fit: contain;
    }
    .robotics .world-shade {
      background: linear-gradient(transparent 70%, #081725aa);
    }
    .robotics .format-ribbon {
      top: auto;
      bottom: 10px;
      font-size: 9px;
      background: #0d2637e8;
      border-color: #71decc70;
      color: #c0f3e7;
    }
    .robotics .artifact-sheets {
      margin: 0;
    }
    .robotics .main-sheet {
      transform: none;
      background: transparent;
      color: #e9f4f8;
      box-shadow: none;
      padding: 20px 7px 10px;
    }
    .robotics .sheet-masthead {
      color: #88d9c8;
    }
    .robotics h2 {
      font: 750 clamp(21px, 2vw, 27px)/1.2 system-ui;
      margin: 10px 0;
    }
    .robotics .ink-rule,
    .robotics .main-sheet footer,
    .robotics .note-pin,
    .robotics .note-lines,
    .robotics .note-signature {
      display: none;
    }
    .robotics .excerpt {
      font: 12px/1.6 system-ui;
      color: #b8cfdc;
    }
    .robotics .evidence-note {
      transform: none;
      box-shadow: none;
      margin: 5px 7px 0;
      padding: 12px 0 5px;
      background: transparent;
      border-top: 1px solid #496b7a;
      color: #bad7df;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .robotics .note-label {
      font-size: 7px;
      color: #83aaba;
    }
    .robotics .evidence-note p {
      font: 650 11px/1.4 system-ui;
      margin: 0;
      color: #a5eed7;
    }
    .robotics figcaption {
      margin: 12px 4px 0;
      color: #87a9bd;
      font-size: 9px;
    }
    .frontier .main-sheet {
      background: repeating-linear-gradient(transparent 0 23px, #876a3912 23px 24px), #fff3da;
    }
    .museum {
      background: #253f3a;
      --product-accent: #d9b77a;
    }
    .museum .artifact-sheets {
      margin-top: 20px;
    }
    .broadcast {
      background: #102d44;
      --product-accent: #abdaec;
    }
    .broadcast .product-world {
      border: 5px solid #09202d;
    }
    .broadcast .broadcast-label {
      display: flex;
      position: absolute;
      bottom: 25px;
      left: 20px;
      right: 20px;
      gap: 10px;
      align-items: center;
      color: white;
      font: 700 12px system-ui;
    }
    .broadcast-label i {
      background: #e84343;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .broadcast-label span {
      margin-left: auto;
      font-size: 8px;
    }
    .senate {
      background: #432d33;
      --product-accent: #ecc7a2;
    }
    .senate .main-sheet {
      border-top: 5px double #7c4245;
    }
    .atlas {
      background: #183b49;
      --product-accent: #f0c96f;
    }
    .atlas .route-line {
      display: block;
      position: absolute;
      inset: 35px 5% auto;
      width: 90%;
      filter: drop-shadow(0 2px 3px #0008);
    }
    .route-line path {
      fill: none;
      stroke: #ffd57d;
      stroke-width: 4;
      stroke-dasharray: 9 6;
    }
    .route-line circle {
      fill: #fff6d8;
      stroke: #594219;
      stroke-width: 2;
    }
    .island-story {
      background: #193845;
      --product-accent: #e6bc79;
    }
    .island-story .main-sheet {
      border-left: 9px solid #755036;
      border-radius: 2px 8px 8px 2px;
    }
    @media (max-width: 650px) {
      .product-preview {
        padding: 13px;
      }
      .side-sheet {
        display: none;
      }
      .artifact-sheets {
        margin-left: 5px;
        margin-right: 5px;
        grid-template-columns: 1fr 0.36fr;
      }
      .main-sheet {
        padding: 17px;
      }
      .evidence-note {
        padding: 19px 10px 12px;
      }
      .evidence-note p {
        font-size: 13px;
      }
      .world-image {
        height: 240px;
      }
    }
    @media (prefers-reduced-motion: no-preference) {
      .product-preview {
        animation: arrive 0.6s ease-out;
      }
      @keyframes arrive {
        from {
          opacity: 0;
          transform: translateY(16px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  `,
})
export class ProjectProductPreviewComponent {
  readonly config = input.required<ProjectIntroConfig>();
}
