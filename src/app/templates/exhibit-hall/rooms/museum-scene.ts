import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {
  museumRoomLayout,
  DEFAULT_MUSEUM_ROOM_LAYOUT,
  type MuseumDisplaySlot,
} from './museum-room';
import type {
  MuseumSceneCallbacks,
  MuseumSceneContent,
  MuseumScenePort,
} from './museum-scene-contracts';
import type { MuseumBoardObject } from '../domain/exhibit-types';
import { buildTempleMuseum, TEMPLE_PALETTE } from './temple-museum-architecture';

interface DisplayAsset {
  readonly source: string;
  readonly group: THREE.Group;
  readonly controller: AbortController;
  loading: boolean;
  error?: string;
}

/** One visible room, one canvas. Geometry and camera routes are platform-owned. */
export class MuseumScene implements MuseumScenePort {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(54, 1, 0.1, 70);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly controls: OrbitControls;
  private readonly observer: ResizeObserver;
  private readonly architecture = new THREE.Group();
  private readonly signage = new THREE.Group();
  private readonly exhibits = new THREE.Group();
  private readonly assets = new Map<string, DisplayAsset>();
  private readonly loader = new GLTFLoader();
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private content?: MuseumSceneContent;
  private roomKey = '';
  private signKey = '';
  private frame = 0;
  private disposed = false;
  private lost = false;
  private pointerStart = { x: 0, y: 0 };
  private transition?: {
    start: number;
    from: THREE.Vector3;
    targetFrom: THREE.Vector3;
    to: THREE.Vector3;
    targetTo: THREE.Vector3;
  };
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  constructor(
    private readonly host: HTMLElement,
    private readonly callbacks: MuseumSceneCallbacks,
  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.setAttribute('aria-hidden', 'true');
    this.renderer.domElement.style.cssText =
      'display:block;width:100%;height:100%;touch-action:pan-y;';
    host.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color('#d4b681');
    this.scene.add(this.architecture, this.signage, this.exhibits);
    this.scene.add(new THREE.HemisphereLight('#fff0cf', '#806344', 2.1));
    const sun = new THREE.DirectionalLight('#ffdda1', 3.4);
    sun.position.set(-4, 9, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 28 });
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.04;
    this.scene.add(sun);
    const bounce = new THREE.DirectionalLight('#dceaf1', 1.25);
    bounce.position.set(5, 4, -2);
    this.scene.add(bounce);
    this.camera.position.set(0, 3.1, 8.8);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1.65, -1.6);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.minAzimuthAngle = -0.5;
    this.controls.maxAzimuthAngle = 0.5;
    this.controls.minPolarAngle = 0.95;
    this.controls.maxPolarAngle = 1.58;
    this.controls.rotateSpeed = 0.4;
    this.controls.addEventListener('change', this.invalidate);
    this.controls.addEventListener('start', this.cancelTransition);
    this.controls.update();
    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown);
    this.renderer.domElement.addEventListener('pointerup', this.onPointerUp);
    this.renderer.domElement.addEventListener('webglcontextlost', this.onContextLost);
    this.observer = new ResizeObserver(this.resize);
    this.observer.observe(host);
    document.addEventListener('visibilitychange', this.invalidate);
    this.resize();
  }

  update(content: MuseumSceneContent): void {
    if (this.disposed || this.lost) return;
    this.content = content;
    const room = content.kind === 'room' ? content.board.museumRoom : undefined;
    const key = content.kind === 'room' ? `room:${room?.roomId}:${room?.layoutId}` : 'lobby';
    const layout = museumRoomLayout(room?.layoutId ?? DEFAULT_MUSEUM_ROOM_LAYOUT);
    if (!layout) {
      this.callbacks.failed(
        'This room design is unavailable. Your exhibit text is still readable.',
      );
      return;
    }
    if (key !== this.roomKey) {
      this.clearAssets();
      this.clearGroup(this.architecture);
      this.clearGroup(this.signage);
      this.roomKey = key;
      this.signKey = '';
      this.buildArchitecture(layout.width, layout.depth, layout.height);
      if (content.kind === 'room') for (const slot of layout.slots) this.buildDisplay(slot);
      this.focusDisplay();
    }
    const signKey = JSON.stringify(
      content.kind === 'lobby'
        ? content.doors
        : [
            content.label,
            content.board.title,
            content.board.centralClaim,
            content.board.objects.map((object) => [object.id, object.title]),
            room?.placements,
          ],
    );
    if (signKey !== this.signKey) {
      this.signKey = signKey;
      this.clearGroup(this.signage);
      if (content.kind === 'lobby') this.buildLobby(content);
      else {
        this.sign(
          this.signage,
          [
            content.label.toUpperCase(),
            content.board.title || 'Your story starts here',
            'A COLLECTION BY ' + content.board.teamCredit.displayName.toUpperCase(),
          ],
          5.3,
          1.45,
          [0, 3.8, -5.86],
          TEMPLE_PALETTE.lapis,
          '#fff5df',
        );
        for (const slot of layout.slots) {
          const objectId = room?.placements.find(
            (placement) => placement.slotId === slot.id,
          )?.objectId;
          const object = content.board.objects.find((item) => item.id === objectId);
          const [x, , z] = slot.position;
          const plaque = this.sign(
            this.signage,
            [slot.label.toUpperCase(), object?.title ?? 'Add an artifact'],
            1.8,
            0.43,
            [x, 0.61, z + 1.03],
            TEMPLE_PALETTE.lapis,
            '#fff5df',
          );
          plaque.userData['selectionId'] = slot.id;
        }
      }
    }
    if (content.kind === 'room') {
      for (const slot of layout.slots) {
        const objectId = room?.placements.find(
          (placement) => placement.slotId === slot.id,
        )?.objectId;
        const object = content.board.objects.find((item) => item.id === objectId);
        this.syncAsset(slot, object);
      }
    }
    this.reportAssets();
    this.invalidate();
  }

  focusDisplay(id?: string): void {
    const layout = museumRoomLayout(
      this.content?.kind === 'room'
        ? (this.content.board.museumRoom?.layoutId ?? '')
        : DEFAULT_MUSEUM_ROOM_LAYOUT,
    );
    const slot = layout?.slots.find((item) => item.id === id);
    const position = slot
      ? new THREE.Vector3(slot.position[0] * 0.85, 2.05, slot.position[2] + 4.2)
      : new THREE.Vector3(0, 3.1, 8.8);
    const target = slot
      ? new THREE.Vector3(slot.position[0], 1.65, slot.position[2])
      : new THREE.Vector3(0, 1.65, -1.6);
    if (this.reducedMotion.matches) {
      this.camera.position.copy(position);
      this.controls.target.copy(target);
      this.controls.update();
      this.invalidate();
      return;
    }
    this.transition = {
      start: performance.now(),
      from: this.camera.position.clone(),
      targetFrom: this.controls.target.clone(),
      to: position,
      targetTo: target,
    };
    this.invalidate();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.observer.disconnect();
    this.controls.dispose();
    document.removeEventListener('visibilitychange', this.invalidate);
    this.renderer.domElement.removeEventListener('pointerdown', this.onPointerDown);
    this.renderer.domElement.removeEventListener('pointerup', this.onPointerUp);
    this.renderer.domElement.removeEventListener('webglcontextlost', this.onContextLost);
    this.clearAssets();
    this.clearGroup(this.architecture);
    this.clearGroup(this.signage);
    this.scene.traverse((object) => {
      if (object instanceof THREE.Light) object.dispose();
    });
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }

  private buildArchitecture(width: number, depth: number, height: number): void {
    buildTempleMuseum(this.architecture, width, depth, height);
  }

  private buildDisplay(slot: MuseumDisplaySlot): void {
    const [x, , z] = slot.position;
    const group = new THREE.Group();
    group.userData['selectionId'] = slot.id;
    this.architecture.add(group);
    const stone = this.material(TEMPLE_PALETTE.sandstone),
      trim = this.material(TEMPLE_PALETTE.gold, 0.35),
      top = this.material(TEMPLE_PALETTE.paleStone);
    this.box(group, [2.14, 0.12, 2.05], [x, 0.08, z], trim);
    this.box(group, [1.96, 0.85, 1.87], [x, 0.54, z], stone).castShadow = true;
    this.box(group, [2.1, 0.12, 2.02], [x, 1.03, z], top).receiveShadow = true;
    this.box(group, [2.01, 0.04, 1.93], [x, 0.98, z], trim);
    this.box(group, [2, 0.13, 1.91], [x, 0.23, z], this.material(TEMPLE_PALETTE.lapis));
    const marker = this.sign(
      group,
      [slot.label.slice(-1)],
      0.42,
      0.42,
      [x, 1.13, z + 0.6],
      TEMPLE_PALETTE.lapis,
      '#f8edcd',
    );
    marker.rotation.x = -Math.PI / 2;
  }

  private buildLobby(content: Extract<MuseumSceneContent, { kind: 'lobby' }>): void {
    this.sign(
      this.signage,
      ['FORGE · CLASS MUSEUM', 'Small objects. Big stories.', 'STEP INSIDE A STUDENT COLLECTION'],
      6.7,
      1.65,
      [0, 3.55, -5.83],
      TEMPLE_PALETTE.lapis,
      '#fff2d5',
    );
    const lapis = this.material(TEMPLE_PALETTE.lapis),
      brass = this.material(TEMPLE_PALETTE.gold, 0.35),
      sandstone = this.material(TEMPLE_PALETTE.paleStone);
    // Fixed entrance positions, expanded into additional rows for larger classes.
    content.doors.forEach((door, index) => {
      const side = index % 2 === 0 ? -1 : 1;
      const row = Math.floor(index / 2);
      if (row > 1) return; // Additional rooms remain reachable in the semantic room directory.
      const doorway = new THREE.Group();
      doorway.position.set(side * 5.8, 0, -3.1 + row * 4.7);
      doorway.rotation.y = side === -1 ? Math.PI / 2 : -Math.PI / 2;
      doorway.userData['selectionId'] = door.id;
      this.signage.add(doorway);
      this.box(doorway, [2.55, 3.65, 0.15], [0, 1.82, 0], brass);
      this.box(doorway, [2.33, 3.5, 0.17], [0, 1.75, 0.06], lapis);
      for (const x of [-1.36, 1.36])
        this.box(doorway, [0.25, 3.75, 0.32], [x, 1.87, 0.09], sandstone);
      this.box(doorway, [3.05, 0.28, 0.4], [0, 3.85, 0.1], sandstone);
      this.box(doorway, [3.12, 0.07, 0.44], [0, 3.65, 0.11], brass);
      this.sign(
        doorway,
        ['ROOM ' + door.number, door.title, door.curator],
        2.06,
        1.5,
        [0, 2.3, 0.16],
        '#e7ddc6',
        TEMPLE_PALETTE.lapis,
      );
      this.box(doorway, [0.07, 0.55, 0.12], [0.82, 1, 0.2], brass);
    });
    const bench = this.material(TEMPLE_PALETTE.sandstone);
    this.box(this.signage, [3.2, 0.2, 0.9], [0, 0.65, -1.3], bench).castShadow = true;
    for (const x of [-1.15, 1.15]) this.box(this.signage, [0.15, 0.55, 0.7], [x, 0.3, -1.3], brass);
    this.sign(
      this.signage,
      [
        content.doors.length
          ? `${content.doors.length} COLLECTIONS TO EXPLORE`
          : 'THE MUSEUM IS GETTING READY',
        'Choose a room to begin',
      ],
      3.4,
      0.7,
      [0, 1.45, -3.9],
      '#e7ddc6',
      TEMPLE_PALETTE.lapis,
    );
  }

  private syncAsset(slot: MuseumDisplaySlot, object?: MuseumBoardObject): void {
    const source = object?.model?.src ?? object?.imageAssetId ?? '';
    const existing = this.assets.get(slot.id);
    if (existing?.source === source) return;
    if (existing) {
      existing.controller.abort();
      this.clearGroup(existing.group);
      existing.group.removeFromParent();
      this.assets.delete(slot.id);
    }
    if (!object || !source) return;
    const group = new THREE.Group();
    group.position.set(slot.position[0], 1.11, slot.position[2]);
    group.userData['selectionId'] = slot.id;
    this.exhibits.add(group);
    const asset: DisplayAsset = { source, group, controller: new AbortController(), loading: true };
    this.assets.set(slot.id, asset);
    if (!object.model) {
      asset.loading = false;
      // Existing image-based exhibits keep a readable presentation, without converting images into models.
      this.sign(
        group,
        [object.title, object.imageAlt ?? 'Artifact image'],
        1.75,
        1.3,
        [0, 0.8, 0],
        '#eee5d0',
        TEMPLE_PALETTE.lapis,
      );
      return;
    }
    void this.loadModel(object, asset).then(() => {
      this.reportAssets();
      this.invalidate();
    });
  }

  private async loadModel(object: MuseumBoardObject, asset: DisplayAsset): Promise<void> {
    try {
      const response = await fetch(asset.source, { signal: asset.controller.signal });
      if (!response.ok) throw new Error('Model unavailable');
      const bytes = await response.arrayBuffer();
      if (asset.controller.signal.aborted || this.disposed) return;
      const model = await this.loader.parseAsync(
        bytes,
        new URL('.', new URL(asset.source, document.baseURI)).href,
      );
      if (asset.controller.signal.aborted || this.disposed) {
        disposeTree(model.scene);
        return;
      }
      const bounds = new THREE.Box3().setFromObject(model.scene);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const scale = Math.min(
        1.8 / Math.max(size.x, 0.001),
        2.15 / Math.max(size.y, 0.001),
        1.65 / Math.max(size.z, 0.001),
      );
      model.scene.scale.multiplyScalar(scale);
      model.scene.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
      model.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      asset.group.add(model.scene);
      asset.loading = false;
    } catch {
      if (asset.controller.signal.aborted || this.disposed) return;
      asset.loading = false;
      asset.error = object.title;
      this.sign(
        asset.group,
        [object.title, 'Model unavailable'],
        1.6,
        0.8,
        [0, 0.65, 0],
        '#f3e9d5',
        '#493d32',
      );
    }
  }

  private reportAssets(): void {
    if (this.disposed) return;
    this.callbacks.status(
      [...this.assets.values()].filter((asset) => asset.loading).length,
      [...this.assets.values()].flatMap((asset) => (asset.error ? [asset.error] : [])),
    );
  }
  private clearAssets(): void {
    for (const asset of this.assets.values()) {
      asset.controller.abort();
      this.clearGroup(asset.group);
      asset.group.removeFromParent();
    }
    this.assets.clear();
  }
  private clearGroup(group: THREE.Group): void {
    disposeTree(group);
    group.clear();
  }
  private material(color: string, metalness = 0): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness });
  }
  private box(
    group: THREE.Group,
    size: readonly number[],
    position: readonly number[],
    material: THREE.Material,
  ): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
    mesh.position.set(position[0], position[1], position[2]);
    group.add(mesh);
    return mesh;
  }
  private sign(
    group: THREE.Group,
    lines: readonly string[],
    width: number,
    height: number,
    position: readonly number[],
    background: string,
    color: string,
  ): THREE.Mesh {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = Math.max(180, Math.round((1024 * height) / width));
    const context = canvas.getContext('2d')!;
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = color;
    context.globalAlpha = 0.3;
    context.lineWidth = 2;
    context.strokeRect(13, 13, canvas.width - 26, canvas.height - 26);
    context.globalAlpha = 1;
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    lines.forEach((line, index) => {
      let fontSize =
        index === 1
          ? Math.min(66, canvas.height * 0.26)
          : Math.min(32, canvas.height / (lines.length * 1.9));
      const family = index === 1 ? 'Georgia, serif' : 'Arial, sans-serif';
      context.font = `${fontSize}px ${family}`;
      while (context.measureText(line).width > 935 && fontSize > 16) {
        fontSize -= 1;
        context.font = `${fontSize}px ${family}`;
      }
      context.fillText(line, 512, canvas.height * ((index + 0.65) / (lines.length + 0.3)), 950);
    });
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
    );
    mesh.position.set(position[0], position[1], position[2]);
    group.add(mesh);
    return mesh;
  }
  private readonly cancelTransition = () => {
    this.transition = undefined;
  };
  private readonly resize = () => {
    if (this.disposed) return;
    const width = Math.max(1, this.host.clientWidth),
      height = Math.max(1, this.host.clientHeight);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.invalidate();
  };
  private readonly invalidate = () => {
    if (!this.frame && !this.disposed && !this.lost)
      this.frame = requestAnimationFrame(this.render);
  };
  private readonly render = (now: number) => {
    this.frame = 0;
    if (this.disposed || this.lost || document.hidden) return;
    if (this.transition) {
      const t = Math.min(1, (now - this.transition.start) / 550),
        eased = t * t * (3 - 2 * t);
      this.camera.position.lerpVectors(this.transition.from, this.transition.to, eased);
      this.controls.target.lerpVectors(this.transition.targetFrom, this.transition.targetTo, eased);
      this.controls.update();
      if (t === 1) this.transition = undefined;
      else this.invalidate();
    }
    this.renderer.render(this.scene, this.camera);
  };
  private readonly onPointerDown = (event: PointerEvent) => {
    this.pointerStart = { x: event.clientX, y: event.clientY };
  };
  private readonly onPointerUp = (event: PointerEvent) => {
    if (Math.hypot(event.clientX - this.pointerStart.x, event.clientY - this.pointerStart.y) > 7)
      return;
    const bounds = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      (-(event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects(
      [this.architecture, this.signage, this.exhibits],
      true,
    )[0];
    for (let object: THREE.Object3D | null = hit?.object ?? null; object; object = object.parent) {
      const id: unknown = object.userData['selectionId'];
      if (typeof id === 'string') {
        this.callbacks.selected(id);
        return;
      }
    }
  };
  private readonly onContextLost = (event: Event) => {
    event.preventDefault();
    this.lost = true;
    this.callbacks.failed(
      'The 3D view was interrupted. Reload the room to restore it. Your labels and draft are safe.',
    );
  };
}

function disposeTree(root: THREE.Object3D): void {
  const geometries = new Set<THREE.BufferGeometry>(),
    materials = new Set<THREE.Material>(),
    textures = new Set<THREE.Texture>();
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      materials.add(material);
      for (const value of Object.values(material))
        if (value instanceof THREE.Texture) textures.add(value);
    }
  });
  textures.forEach((texture) => {
    const image: unknown = texture.source.data;
    if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) image.close();
    texture.dispose();
  });
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}
