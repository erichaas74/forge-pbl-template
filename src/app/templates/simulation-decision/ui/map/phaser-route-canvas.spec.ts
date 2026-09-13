import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
vi.mock('phaser', () => ({}));
import { PhaserRouteCanvasComponent, ROUTE_CANVAS_FACTORY } from './phaser-route-canvas.component';
import type {
  RouteCanvasCallbacks,
  RouteCanvasController,
  RouteCanvasSnapshot,
} from './route-canvas.models';
import { FULL_MAP } from './map-viewport';

const snapshot: RouteCanvasSnapshot = {
  scenery: true,
  motion: true,
  selectedRouteId: '',
  previewRouteId: '',
  currentLocationId: 'a',
  companyPosition: { x: 20, y: 30 },
  trails: [],
};
const viewport = { view: FULL_MAP, width: 1000, height: 800, stretch: true };

describe('Phaser canvas lifecycle', () => {
  it('passes updated snapshots and resize state to one renderer and disposes it', async () => {
    const controller = { update: vi.fn(), destroy: vi.fn() };
    let callbacks!: RouteCanvasCallbacks;
    const factory = vi.fn(async (_host, _snapshot, _viewport, received) => {
      callbacks = received;
      return controller;
    });
    TestBed.configureTestingModule({
      providers: [{ provide: ROUTE_CANVAS_FACTORY, useValue: factory }],
    });
    const fixture = TestBed.createComponent(PhaserRouteCanvasComponent);
    fixture.componentRef.setInput('snapshot', snapshot);
    fixture.componentRef.setInput('viewport', viewport);
    const status = vi.fn();
    fixture.componentInstance.statusChanged.subscribe(status);
    fixture.detectChanges();
    await fixture.whenStable();
    callbacks.ready();
    expect(status).toHaveBeenCalledWith('ready');
    const next = { ...snapshot, motion: false };
    const resized = { ...viewport, width: 640 };
    fixture.componentRef.setInput('snapshot', next);
    fixture.componentRef.setInput('viewport', resized);
    fixture.detectChanges();
    expect(controller.update).toHaveBeenLastCalledWith(next, resized);
    expect(factory).toHaveBeenCalledTimes(1);
    fixture.destroy();
    expect(controller.destroy).toHaveBeenCalledTimes(1);
    status.mockClear();
    callbacks.ready();
    expect(status).not.toHaveBeenCalled();
  });

  it('disposes a renderer that finishes loading after navigation away', async () => {
    const controller = { update: vi.fn(), destroy: vi.fn() };
    let resolve!: (value: RouteCanvasController) => void;
    const loading = new Promise<RouteCanvasController>((done) => {
      resolve = done;
    });
    TestBed.configureTestingModule({
      providers: [{ provide: ROUTE_CANVAS_FACTORY, useValue: () => loading }],
    });
    const fixture = TestBed.createComponent(PhaserRouteCanvasComponent);
    fixture.componentRef.setInput('snapshot', snapshot);
    fixture.componentRef.setInput('viewport', viewport);
    fixture.detectChanges();
    fixture.destroy();
    resolve(controller);
    await loading;
    await Promise.resolve();
    expect(controller.destroy).toHaveBeenCalledTimes(1);
    expect(controller.update).not.toHaveBeenCalled();
  });

  it('reports loading failure so the semantic map can remain available', async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ROUTE_CANVAS_FACTORY,
          useValue: async () => {
            throw new Error('No graphics context');
          },
        },
      ],
    });
    const fixture = TestBed.createComponent(PhaserRouteCanvasComponent);
    fixture.componentRef.setInput('snapshot', snapshot);
    fixture.componentRef.setInput('viewport', viewport);
    const status = vi.fn();
    fixture.componentInstance.statusChanged.subscribe(status);
    fixture.detectChanges();
    await fixture.whenStable();
    await vi.waitFor(() => expect(status).toHaveBeenCalledWith('failed'));
  });

  it('bounds a stalled graphics download and disposes a late renderer', async () => {
    vi.useFakeTimers();
    try {
      let resolve!: (value: RouteCanvasController) => void;
      const pending = new Promise<RouteCanvasController>((done) => {
        resolve = done;
      });
      TestBed.configureTestingModule({
        providers: [{ provide: ROUTE_CANVAS_FACTORY, useValue: () => pending }],
      });
      const fixture = TestBed.createComponent(PhaserRouteCanvasComponent);
      fixture.componentRef.setInput('snapshot', snapshot);
      fixture.componentRef.setInput('viewport', viewport);
      const status = vi.fn();
      fixture.componentInstance.statusChanged.subscribe(status);
      fixture.detectChanges();
      await vi.advanceTimersByTimeAsync(15_000);
      expect(status).toHaveBeenCalledWith('failed');
      const controller = { update: vi.fn(), destroy: vi.fn() };
      resolve(controller);
      await pending;
      await Promise.resolve();
      expect(controller.destroy).toHaveBeenCalledTimes(1);
      fixture.destroy();
    } finally {
      vi.useRealTimers();
    }
  });
});
