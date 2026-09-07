import { Component, input } from '@angular/core';
import type { OpeningChoice } from '../../shared/project-intro/decision-scene.models';

@Component({
  selector: 'app-cargo-wagon',
  template: `
    <div class="wagon" role="img" [attr.aria-label]="alt() + ': ' + cargoNames()">
      <img class="vehicle" [src]="image()" alt="" />
      <div class="supplies">
        @for (item of items(); track item.id) {
          <img class="supply" [src]="item.image" alt="" />
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      pointer-events: none;
    }
    .wagon {
      position: relative;
      width: 100%;
      aspect-ratio: 1492 / 929;
      animation: arrive 0.45s ease-out;
    }
    .vehicle {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 8px 7px #20150da6);
    }
    .supplies {
      position: absolute;
      left: 36%;
      top: 4%;
      width: 52%;
      height: 39%;
      display: flex;
      align-items: end;
    }
    .supply {
      width: 48%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 3px 2px #21170f80);
      animation: load 0.35s ease-out;
    }
    @keyframes arrive {
      from {
        opacity: 0;
        transform: translateX(40px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
    @keyframes load {
      from {
        opacity: 0;
        transform: translateY(-24px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .wagon,
      .supply {
        animation: none;
      }
    }
  `,
})
export class CargoWagonComponent {
  readonly image = input.required<string>();
  readonly alt = input.required<string>();
  readonly items = input.required<readonly OpeningChoice[]>();
  cargoNames(): string {
    return this.items()
      .map((item) => item.cargo?.name ?? item.label)
      .join(', ');
  }
}
