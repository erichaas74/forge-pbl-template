import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { stationPositions, studioCamera, type BroadcastConfig, type CameraPose, type StudioView } from './broadcast.models';
import { drawPodium, drawQuestion, StudioScreen } from './studio-screens';

/** Pure visual renderer. Receives only the public display projection and never mutates game state. */
export class StudioScene {
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(39, 16 / 9, .1, 160);
  private readonly renderer: THREE.WebGLRenderer;
  private readonly composer: EffectComposer;
  private readonly bloom: UnrealBloomPass;
  private readonly environment: THREE.WebGLRenderTarget;
  private readonly floorReflection: Reflector;
  private readonly resize: ResizeObserver;
  private readonly visibility: IntersectionObserver;
  private readonly stationGroup = new THREE.Group();
  private readonly screens: StudioScreen[] = [];
  private readonly screen = new StudioScreen(2048, 896);
  private readonly loaders = new THREE.TextureLoader();
  private readonly textures = new Set<THREE.Texture>();
  private readonly images = new Map<string, HTMLImageElement>();
  private readonly failedAssets = new Set<string>();
  private readonly curtains: THREE.Mesh[] = [];
  private readonly accentLights: THREE.PointLight[] = [];
  private readonly target = new THREE.Vector3();
  private readonly fromTarget = new THREE.Vector3();
  private readonly fromPosition = new THREE.Vector3();
  private goal: CameraPose;
  private fromFov = 39;
  private moveAt = 0;
  private view?: StudioView;
  private teamSignature = '';
  private drawSignature = '';
  private shotSignature = '';
  private frame = 0;
  private disposed = false;
  private visible = true;
  private shutter = 0;
  private lastFrame = 0;
  private motion = true;
  private readonly onVisibility = () => { this.visible = !document.hidden; if (this.visible) this.start(); };
  private readonly onContextLost = (event: Event) => { event.preventDefault(); this.report('The 3D stage lost its graphics context. Reload to restore it; show controls remain available.'); this.visible = false; };

  constructor(private readonly host: HTMLElement, private readonly theme: BroadcastConfig, private readonly report: (message: string) => void) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace; this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0; this.renderer.shadowMap.enabled = true; this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.setAttribute('aria-hidden', 'true'); this.host.appendChild(this.renderer.domElement);
    this.renderer.domElement.addEventListener('webglcontextlost', this.onContextLost);
    this.scene.background = new THREE.Color(theme.palette.background); this.scene.fog = new THREE.Fog(theme.palette.background, 45, 90);
    const pmrem = new THREE.PMREMGenerator(this.renderer); const room = new RoomEnvironment();
    this.environment = pmrem.fromScene(room, .06); this.scene.environment = this.environment.texture; this.scene.environmentIntensity = .4; room.dispose(); pmrem.dispose();
    this.scene.add(new THREE.HemisphereLight('#d4e9ff', '#101526', .85));
    const key = new THREE.DirectionalLight('#fff3d8', 1.8); key.position.set(3, 11, 10); key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024); Object.assign(key.shadow.camera, { left: -19, right: 19, top: 12, bottom: -12, far: 50 }); key.shadow.bias = -.001;
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(theme.palette.secondary, 1); fill.position.set(-12, 5, -1); this.scene.add(fill);

    const dark = new THREE.MeshStandardMaterial({ color: theme.palette.metal, metalness: .8, roughness: .26 });
    const stage = new THREE.MeshPhysicalMaterial({ color: '#111b2b', metalness: .65, roughness: theme.materials.floorRoughness, clearcoat: 1 });
    this.floorReflection = new Reflector(new THREE.PlaneGeometry(35, 16), { color: '#111927', textureWidth: 1024, textureHeight: 1024, clipBias: .003 });
    this.floorReflection.rotation.x = -Math.PI / 2; this.floorReflection.position.set(0, .081, -.5); this.scene.add(this.floorReflection);
    this.box(35, .18, 16, 0, -.02, -.5, stage).receiveShadow = true;
    if (theme.assets.floor) this.texture(theme.assets.floor, texture => { texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(5, 3); stage.map = texture; stage.needsUpdate = true; this.floorReflection.visible = false; });
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(13.4 + i * .32, .035, 6, 140, Math.PI), this.glow(i === 1 ? theme.palette.secondary : theme.palette.accent, 1.6));
      ring.rotation.x = Math.PI / 2; ring.rotation.z = Math.PI; ring.position.set(0, .10, -.8); this.scene.add(ring);
    }
    this.box(34, 12, .65, 0, 5.6, -8.4, dark);
    const mural = new THREE.MeshBasicMaterial({ color: theme.palette.secondary });
    const muralPlane = new THREE.Mesh(new THREE.PlaneGeometry(33.4, 11.5), mural); muralPlane.position.set(0, 5.6, -8.05); this.scene.add(muralPlane);
    if (theme.assets.backdrop) this.texture(theme.assets.backdrop, texture => { mural.map = texture; mural.color.set('#ffffff'); mural.needsUpdate = true; });
    for (const side of [-1, 1]) {
      for (let i = 0; i < 7; i++) {
        const x = side * (9 + i * .82);
        this.box(.42, 9.7, .42, x, 4.8, -7.3 + i * .28, dark);
        this.box(.055, 9.3, .08, x + side * .22, 4.8, -7 + i * .28, this.glow(i % 2 ? theme.palette.secondary : theme.palette.accent, 2));
      }
      const light = new THREE.PointLight(theme.palette.secondary, 90, 25, 2); light.position.set(side * 10, 4, 0); this.scene.add(light); this.accentLights.push(light);
      // Visible overhead lighting fixtures and truss depth make camera dollies legible.
      this.box(.18, .18, 17, side * 11, 11.2, 0, dark);
      for (let i = 0; i < 5; i++) {
        const fixture = this.box(.65, .45, .7, side * 10, 10.8, -5 + i * 3, dark); fixture.rotation.z = side * -.35;
        this.box(.48, .025, .5, side * 10, 10.56, -5 + i * 3, this.glow('#d7edff', 2));
      }
    }
    for (const y of [10.8, 11.4]) this.box(24, .12, .12, 0, y, -3, dark);
    this.box(14.5, 6.8, .65, 0, 5.55, -6.9, dark);
    this.box(14.25, 6.55, .12, 0, 5.55, -6.5, this.glow(theme.palette.accent, 1.6));
    const display = new THREE.Mesh(new THREE.PlaneGeometry(13.85, 6.07), new THREE.MeshBasicMaterial({ map: this.screen.texture, toneMapped: false }));
    display.position.set(0, 5.55, -6.40); this.scene.add(display);
    for (const side of [-1, 1]) {
      const panel = this.box(6.94, 6.1, .08, side * 3.47, 5.55, -6.29, new THREE.MeshStandardMaterial({ color: theme.palette.background, metalness: .45, roughness: .26 }));
      const edge = this.box(.028, 6.1, .1, -side * 3.44, 0, .07, this.glow(theme.palette.accent, 2)); this.scene.remove(edge); panel.add(edge);
      this.curtains.push(panel);
    }
    this.scene.add(this.stationGroup); this.textures.add(this.screen.texture);
    this.goal = studioCamera('wide', 4, 0, theme.camera.fieldOfView);
    this.camera.position.fromArray(this.goal.position); this.target.fromArray(this.goal.target); this.camera.lookAt(this.target);
    const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
    this.composer = new EffectComposer(this.renderer, target); this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1280, 720), .22, .35, 1.0); this.composer.addPass(this.bloom); this.composer.addPass(new OutputPass());
    this.resize = new ResizeObserver(() => this.resizeToHost()); this.resize.observe(host); this.resizeToHost();
    this.visibility = new IntersectionObserver(entries => { this.visible = entries[0].isIntersecting && !document.hidden; if (this.visible) this.start(); }); this.visibility.observe(host);
    document.addEventListener('visibilitychange', this.onVisibility); this.start();
  }
  update(view: StudioView, reducedMotion: boolean): void {
    this.view = view; this.motion = !reducedMotion;
    const teams = view.teams.map(t => t.id).join('|');
    if (teams !== this.teamSignature) { this.teamSignature = teams; this.buildTeams(view); }
    const signature = JSON.stringify(view);
    if (signature !== this.drawSignature) { this.drawSignature = signature; this.draw(view); }
    const shot = `${view.shot}:${view.teamId}:${teams}`;
    if (shot !== this.shotSignature) {
      this.shotSignature = shot; this.fromPosition.copy(this.camera.position); this.fromTarget.copy(this.target); this.fromFov = this.camera.fov;
      this.goal = studioCamera(view.shot, view.teams.length, Math.max(0, view.teams.findIndex(t => t.id === view.teamId)), this.theme.camera.fieldOfView); this.moveAt = performance.now();
    }
    if (reducedMotion) { this.camera.position.fromArray(this.goal.position); this.target.fromArray(this.goal.target); this.camera.fov = this.goal.fov; this.camera.updateProjectionMatrix(); }
    this.start();
  }
  private buildTeams(view: StudioView): void {
    this.disposeGroup(this.stationGroup); this.stationGroup.clear(); this.screens.splice(0).forEach(s => s.dispose());
    const positions = stationPositions(view.teams.length);
    view.teams.forEach((team, index) => {
      const p = positions[index]; const group = new THREE.Group(); group.position.set(p.x, p.y, p.z); this.stationGroup.add(group);
      const metal = new THREE.MeshPhysicalMaterial({ color: this.theme.palette.metal, metalness: this.theme.materials.podiumMetalness, roughness: .24, clearcoat: 1 });
      const shape = (w: number, h: number, d: number, y: number, material: THREE.Material) => {
        const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, .10), material); mesh.position.y = y; mesh.castShadow = true; mesh.receiveShadow = true; group.add(mesh); return mesh;
      };
      shape(2.7, .16, 1.95, .14, metal);
      shape(2.55, .055, 1.85, .25, this.glow(team.color, 1.8));
      const body = shape(2.25, 2.3, 1.3, 1.42, metal);
      if (this.theme.assets.podium) this.texture(this.theme.assets.podium, texture => { metal.map = texture; metal.needsUpdate = true; });
      shape(2.65, .22, 1.85, 2.65, metal); shape(2.6, .04, 1.8, 2.52, this.glow(team.color, 2.1));
      for (const side of [-1, 1]) {
        const edge = new THREE.Mesh(new THREE.BoxGeometry(.045, 2.1, .05), this.glow(team.color, 1.8)); edge.position.set(side * 1.09, 1.45, .67); group.add(edge);
      }
      const buzzer = new THREE.Mesh(new THREE.CylinderGeometry(.19, .23, .10, 24), this.glow(team.color, 1.3)); buzzer.position.set(0, 2.84, .3); group.add(buzzer);
      const screen = new StudioScreen(512, 512); this.screens.push(screen);
      const face = new THREE.Mesh(new THREE.PlaneGeometry(1.97, 1.97), new THREE.MeshBasicMaterial({ map: screen.texture, toneMapped: false }));
      face.position.set(0, 1.45, .66); group.add(face); body.userData['teamId'] = team.id;
      if (team.emblem) this.image(team.emblem);
    });
  }
  private draw(view: StudioView): void {
    const backdrop = view.phase === 'champion' ? this.theme.assets.winnerBackdrop : this.theme.assets.questionScreen;
    if (backdrop) this.image(backdrop);
    const loaded = (url?: string) => { const image = url ? this.images.get(url) : undefined; return image?.complete && image.naturalWidth ? image : undefined; };
    drawQuestion(this.screen, view, this.theme, loaded(backdrop));
    view.teams.forEach((team, i) => drawPodium(this.screens[i], team, this.theme, loaded(team.emblem)));
  }
  private image(url: string): void {
    if (this.images.has(url) || this.failedAssets.has(url)) return;
    const img = new Image(); this.images.set(url, img);
    img.onload = () => { if (!this.disposed && this.view) this.draw(this.view); };
    img.onerror = () => { this.images.delete(url); this.failedAssets.add(url); this.report(`Studio artwork could not load: ${url}`); };
    img.src = url;
  }
  private texture(url: string, apply: (texture: THREE.Texture) => void): void {
    this.loaders.load(url, texture => {
      if (this.disposed) { texture.dispose(); return; }
      texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(8, this.renderer.capabilities.getMaxAnisotropy()); this.textures.add(texture); apply(texture);
    }, undefined, () => this.report(`Studio artwork could not load: ${url}`));
  }
  private box(w: number, h: number, d: number, x: number, y: number, z: number, material: THREE.Material): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material); mesh.position.set(x, y, z); this.scene.add(mesh); return mesh;
  }
  private glow(color: string, intensity: number): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity * .3, roughness: .3, metalness: .3 });
  }
  private resizeToHost(): void {
    const width = Math.max(1, this.host.clientWidth); const height = Math.max(1, this.host.clientHeight);
    this.camera.aspect = width / height; this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false); this.composer?.setSize(width, height);
  }
  private start(): void { if (!this.frame && this.visible && !this.disposed) this.frame = requestAnimationFrame(this.animate); }
  private readonly animate = (now: number): void => {
    this.frame = 0; if (this.disposed || !this.visible) return;
    // Cap the visual loop at 30fps; browser visibility suspends it entirely offscreen.
    if (now - this.lastFrame > 30) {
      const elapsed = Math.min(100, now - (this.lastFrame || now)); this.lastFrame = now;
      const t = this.motion ? Math.min(1, (now - this.moveAt) / Math.max(1, this.theme.camera.moveMs)) : 1;
      const ease = t * t * t * (t * (t * 6 - 15) + 10);
      this.camera.position.lerpVectors(this.fromPosition, new THREE.Vector3(...this.goal.position), ease);
      this.target.lerpVectors(this.fromTarget, new THREE.Vector3(...this.goal.target), ease);
      this.camera.fov = THREE.MathUtils.lerp(this.fromFov, this.goal.fov, ease); this.camera.updateProjectionMatrix(); this.camera.lookAt(this.target);
      const covered = this.view?.cue === 'question' && ['dim', 'travel'].includes(this.view.step);
      const desired = covered ? 1 : 0;
      this.shutter = this.motion ? THREE.MathUtils.damp(this.shutter, desired, 6, elapsed / 1000) : desired;
      this.curtains.forEach((panel, i) => { panel.position.x = (i ? 1 : -1) * (3.47 + (1 - this.shutter) * 7.3); panel.visible = this.shutter > .005; });
      const dim = this.view?.cue === 'question' && this.view.step !== 'idle';
      this.accentLights.forEach(light => { light.intensity = dim ? 10 : 35; });
      this.bloom.strength = this.view?.phase === 'champion' ? .2 : .10;
      this.composer.render();
    }
    this.start();
  };
  private disposeGroup(root: THREE.Object3D): void {
    const materials = new Set<THREE.Material>(); const geometries = new Set<THREE.BufferGeometry>();
    root.traverse(object => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => materials.add(m)); } });
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
  }
  dispose(): void {
    this.disposed = true; cancelAnimationFrame(this.frame); this.resize.disconnect(); this.visibility.disconnect(); document.removeEventListener('visibilitychange', this.onVisibility);
    this.renderer.domElement.removeEventListener('webglcontextlost', this.onContextLost);
    this.screens.forEach(s => s.dispose()); this.screen.dispose(); this.disposeGroup(this.scene);
    this.textures.forEach(t => t.dispose()); this.environment.dispose(); this.floorReflection.getRenderTarget().dispose();
    this.composer.passes.forEach(pass => pass.dispose()); this.composer.dispose(); this.renderer.dispose(); this.renderer.domElement.remove();
  }
}
