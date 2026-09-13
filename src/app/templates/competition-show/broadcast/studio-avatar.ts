import * as THREE from 'three';

/** What an avatar is doing. Derived from public show state only. */
export type AvatarMood = 'idle' | 'ready' | 'buzzed' | 'answered' | 'thinking' | 'correct' | 'champion' | 'missed';

/**
 * What a team is into. Purely cosmetic: it changes the held prop and the headgear,
 * never a score, a turn order, or who may answer.
 */
export type AvatarInterest =
  | 'tennis' | 'skiing' | 'fencing' | 'basketball'
  | 'skateboarding' | 'chess' | 'drumming' | 'astronomy';

export interface InterestSpec { id: AvatarInterest; label: string; }
export const avatarInterests: InterestSpec[] = [
  { id: 'tennis', label: 'Tennis' }, { id: 'skiing', label: 'Skiing' },
  { id: 'fencing', label: 'Fencing' }, { id: 'basketball', label: 'Basketball' },
  { id: 'skateboarding', label: 'Skateboarding' }, { id: 'chess', label: 'Chess' },
  { id: 'drumming', label: 'Drumming' }, { id: 'astronomy', label: 'Astronomy' },
];

/**
 * A stable shuffle: the roster picks one rotation, then each seat takes the next
 * interest along. Every team in a field of eight gets a different one, the choice
 * looks arbitrary, and it never changes between reloads or re-renders.
 */
export function rosterRotation(teamIds: readonly string[]): number {
  let hash = 0;
  for (const character of teamIds.join('|')) hash = (hash * 31 + character.charCodeAt(0)) % 100003;
  return hash;
}
export function interestAt(index: number, rotation: number): AvatarInterest {
  return avatarInterests[(index + rotation) % avatarInterests.length].id;
}
export function interestLabel(id: AvatarInterest): string {
  return avatarInterests.find(interest => interest.id === id)?.label ?? 'Quiz';
}

/** Six neutral tones so a class of eight avatars does not read as one person repeated. */
const skinTones = ['#e8c49a', '#c98f62', '#8d5a3b', '#f0d3b4', '#a86f47', '#6f4429'];
export function avatarSkin(index: number): string { return skinTones[index % skinTones.length]; }
const hairTones = ['#2b2019', '#4a2f1c', '#6b4423', '#1d2433', '#8a6a3f', '#d9c9a8'];
const hairStyles = ['crop', 'bun', 'long', 'curls'] as const;

const GEAR = '#d8dee9';

/** How each mood sets the face: mouth curve, then brow angle. Both are −1…1. */
const expressions: Record<AvatarMood, [number, number]> = {
  idle: [.3, 0], ready: [.45, .15], thinking: [-.1, -.45], answered: [.35, .1],
  buzzed: [.7, .8], correct: [1, .7], champion: [1, .9], missed: [-.8, -.7],
};

/**
 * A procedural contestant standing behind each podium. Built from primitives so a
 * project needs no character art, and animated from show state so nobody puppets it.
 *
 * Only the head, shoulders and a raised prop clear the podium, so everything that
 * has to read from the back of a classroom lives above shoulder height — which is
 * also why the face carries the performance.
 */
export class StudioAvatar {
  readonly root = new THREE.Group();
  private readonly body = new THREE.Group();
  private readonly head = new THREE.Group();
  private readonly arms: THREE.Group[] = [];
  private readonly brows: THREE.Mesh[] = [];
  private readonly pupils: THREE.Mesh[] = [];
  private mouth!: THREE.Mesh;
  /** Held equipment, kept high so the podium never hides it. */
  private readonly prop = new THREE.Group();
  private readonly geometries: THREE.BufferGeometry[] = [];
  private readonly materials: THREE.Material[] = [];
  private mood: AvatarMood = 'idle';
  private readonly phase: number;
  private readonly propRest: number;
  private raise = 0;
  private lean = 0;
  private hop = 0;
  private curve = .3;
  private brow = 0;
  private blink = 1;

  constructor(color: string, skin: string, seedOffset: number, readonly interest: AvatarInterest) {
    // Phase-offset per team so eight contestants never bob in lockstep.
    this.phase = seedOffset * 1.37;
    const shirt = this.material(color, .18);
    const flesh = this.material(skin, .06);

    const torso = this.mesh(new THREE.CapsuleGeometry(.34, .52, 4, 12), shirt);
    torso.position.y = .95; this.body.add(torso);
    // A shoulder bar and a collar stop the torso reading as a bare capsule.
    const shoulders = this.mesh(new THREE.CapsuleGeometry(.17, .44, 4, 10), shirt);
    shoulders.rotation.z = Math.PI / 2; shoulders.position.y = 1.28; this.body.add(shoulders);
    const collar = this.mesh(new THREE.TorusGeometry(.15, .045, 8, 16), this.material(color, .34));
    collar.rotation.x = Math.PI / 2; collar.position.y = 1.4; this.body.add(collar);
    const neck = this.mesh(new THREE.CylinderGeometry(.115, .13, .2, 12), flesh);
    neck.position.y = 1.45; this.body.add(neck);

    this.head.position.y = 1.62; this.body.add(this.head);
    const skull = this.mesh(new THREE.SphereGeometry(.26, 24, 18), flesh);
    this.head.add(skull);
    this.buildFace(flesh);
    this.buildHair(seedOffset);

    for (const side of [-1, 1]) {
      const arm = new THREE.Group(); arm.position.set(side * .38, 1.32, 0);
      const limb = this.mesh(new THREE.CapsuleGeometry(.10, .46, 4, 8), shirt);
      limb.position.y = -.3; arm.add(limb);
      const hand = this.mesh(new THREE.SphereGeometry(.115, 12, 10), flesh);
      hand.position.y = -.58; arm.add(hand);
      arm.rotation.z = side * .12; this.body.add(arm); this.arms.push(arm);
    }
    this.prop.position.set(.5, 1.62, .16); this.body.add(this.prop);
    this.propRest = this.buildInterest(interest, color);
    this.prop.rotation.z = this.propRest;
    this.body.traverse(object => { if (object instanceof THREE.Mesh) { object.castShadow = true; object.receiveShadow = true; } });
    this.root.add(this.body);
  }

  /** Eyes, brows, nose and mouth. At projector distance these carry most of the character. */
  private buildFace(flesh: THREE.Material): void {
    const white = this.material('#f6f2ea', .04);
    const dark = this.material('#1b1712', .02);
    for (const side of [-1, 1]) {
      const eye = this.mesh(new THREE.SphereGeometry(.052, 12, 10), white);
      eye.position.set(side * .105, .045, .205); eye.scale.z = .55; this.head.add(eye);
      const pupil = this.mesh(new THREE.SphereGeometry(.026, 10, 8), dark);
      pupil.position.set(side * .105, .045, .243); pupil.scale.z = .5; this.head.add(pupil);
      this.pupils.push(pupil);
      const brow = this.mesh(new THREE.BoxGeometry(.1, .024, .03), dark);
      brow.position.set(side * .107, .125, .222); this.head.add(brow); this.brows.push(brow);
    }
    const nose = this.mesh(new THREE.SphereGeometry(.038, 10, 8), flesh);
    nose.position.set(0, -.01, .245); nose.scale.set(.8, 1, .9); this.head.add(nose);
    // A half torus: upright it frowns, flipped it smiles, and the mood picks which.
    this.mouth = this.mesh(new THREE.TorusGeometry(.075, .018, 8, 18, Math.PI), dark);
    this.mouth.position.set(0, -.085, .205); this.head.add(this.mouth);
  }

  private buildHair(seedOffset: number): void {
    const hair = this.material(hairTones[seedOffset % hairTones.length], .04);
    const style = hairStyles[seedOffset % hairStyles.length];
    const cap = this.mesh(new THREE.SphereGeometry(.272, 20, 12, 0, Math.PI * 2, 0, Math.PI * .58), hair);
    cap.position.y = .012; this.head.add(cap);
    if (style === 'bun') {
      const bun = this.mesh(new THREE.SphereGeometry(.11, 12, 10), hair);
      bun.position.set(0, .2, -.17); this.head.add(bun);
    } else if (style === 'long') {
      const fall = this.mesh(new THREE.CapsuleGeometry(.16, .3, 4, 10), hair);
      fall.position.set(0, -.16, -.13); fall.scale.z = .7; this.head.add(fall);
    } else if (style === 'curls') {
      for (const [x, y, z] of [[-.19, .13, -.1], [.19, .13, -.1], [0, .2, -.19], [-.13, .05, -.22], [.13, .05, -.22]] as const) {
        const curl = this.mesh(new THREE.SphereGeometry(.095, 10, 8), hair);
        curl.position.set(x, y, z); this.head.add(curl);
      }
    }
  }

  /** Builds the held prop and any headgear. Returns the prop's resting tilt. */
  private buildInterest(interest: AvatarInterest, color: string): number {
    const gear = this.material(GEAR, .1);
    const accent = this.material(color, .3);
    const add = (mesh: THREE.Mesh, x: number, y: number, z = 0) => { mesh.position.set(x, y, z); this.prop.add(mesh); return mesh; };
    switch (interest) {
      case 'tennis': {
        add(this.mesh(new THREE.CylinderGeometry(.035, .035, .46, 8), gear), 0, .2);
        const head = add(this.mesh(new THREE.TorusGeometry(.23, .032, 8, 22), accent), 0, .62);
        head.rotation.y = Math.PI / 2;
        const strings = add(this.mesh(new THREE.CircleGeometry(.21, 20), this.material('#f4f0e6', .05)), 0, .62);
        strings.rotation.y = Math.PI / 2;
        return -.26;
      }
      case 'skiing': {
        for (const offset of [-.13, .13]) add(this.mesh(new THREE.CylinderGeometry(.022, .022, .92, 6), gear), offset, .34, offset * .4);
        for (const offset of [-.13, .13]) add(this.mesh(new THREE.TorusGeometry(.07, .016, 6, 14), accent), offset, .68, offset * .4);
        this.addGoggles(accent);
        return -.12;
      }
      case 'fencing': {
        add(this.mesh(new THREE.CylinderGeometry(.018, .018, 1.15, 6), gear), 0, .55);
        add(this.mesh(new THREE.SphereGeometry(.07, 10, 8), accent), 0, .02);
        add(this.mesh(new THREE.CylinderGeometry(.045, .045, .16, 8), accent), 0, .12);
        this.addMask(gear);
        return -.5;
      }
      case 'basketball': {
        add(this.mesh(new THREE.SphereGeometry(.27, 18, 14), accent), 0, .5);
        for (const angle of [0, Math.PI / 2]) {
          const seam = add(this.mesh(new THREE.TorusGeometry(.272, .012, 6, 24), this.material('#2a1a0e', .05)), 0, .5);
          seam.rotation.y = angle;
        }
        return 0;
      }
      case 'skateboarding': {
        const deck = add(this.mesh(new THREE.BoxGeometry(.2, .92, .05), accent), 0, .46);
        deck.rotation.z = .08;
        for (const y of [.14, .78]) for (const x of [-.075, .075]) add(this.mesh(new THREE.CylinderGeometry(.055, .055, .05, 10), gear), x, y, -.06);
        return -.2;
      }
      case 'chess': {
        add(this.mesh(new THREE.CylinderGeometry(.17, .23, .1, 14), gear), 0, .08);
        add(this.mesh(new THREE.CylinderGeometry(.08, .15, .38, 14), gear), 0, .3);
        add(this.mesh(new THREE.SphereGeometry(.12, 14, 10), accent), 0, .56);
        add(this.mesh(new THREE.ConeGeometry(.05, .12, 10), accent), 0, .7);
        return 0;
      }
      case 'drumming': {
        for (const [x, tilt] of [[-.08, -.3], [.1, .12]] as const) {
          const stick = add(this.mesh(new THREE.CylinderGeometry(.022, .03, .62, 6), gear), x, .34);
          stick.rotation.z = tilt;
        }
        return -.15;
      }
      case 'astronomy': {
        const tube = add(this.mesh(new THREE.CylinderGeometry(.1, .13, .8, 12), gear), 0, .42);
        tube.rotation.z = -.35;
        add(this.mesh(new THREE.CylinderGeometry(.14, .14, .08, 12), accent), .16, .76);
        add(this.mesh(new THREE.CylinderGeometry(.06, .06, .1, 10), accent), -.14, .1);
        return -.1;
      }
    }
  }
  private addGoggles(accent: THREE.Material): void {
    const strap = this.mesh(new THREE.TorusGeometry(.265, .035, 8, 20), accent);
    strap.position.set(0, .06, 0); strap.rotation.x = Math.PI / 2; this.head.add(strap);
    for (const x of [-.11, .11]) {
      const lens = this.mesh(new THREE.SphereGeometry(.085, 10, 8), this.material('#7fd6f0', .35));
      lens.position.set(x, .05, .21); this.head.add(lens);
    }
  }
  private addMask(gear: THREE.Material): void {
    const mask = this.mesh(new THREE.SphereGeometry(.3, 16, 14, 0, Math.PI * 2, 0, Math.PI * .62), gear);
    mask.position.y = .03;
    const material = mask.material as THREE.MeshStandardMaterial;
    material.transparent = true; material.opacity = .55; this.head.add(mask);
  }

  setMood(mood: AvatarMood): void { this.mood = mood; }
  /** `motion` false holds the rest pose so reduced-motion users see a still contestant. */
  update(time: number, motion: boolean): void {
    const mood = this.mood;
    const [curve, brow] = expressions[mood];
    const targetRaise = mood === 'buzzed' ? 1 : mood === 'champion' || mood === 'correct' ? .85 : 0;
    const targetLean = mood === 'thinking' ? .22 : mood === 'answered' ? .08 : mood === 'missed' ? .3 : 0;
    if (!motion) {
      this.raise = targetRaise; this.lean = targetLean; this.hop = 0;
      this.curve = curve; this.brow = brow; this.blink = 1;
      this.applyPose(0, 0, 0); this.applyFace(); return;
    }
    this.raise += (targetRaise - this.raise) * .12;
    this.lean += (targetLean - this.lean) * .1;
    this.curve += (curve - this.curve) * .1;
    this.brow += (brow - this.brow) * .1;
    const t = time + this.phase;
    const lively = mood === 'buzzed' || mood === 'champion' || mood === 'correct';
    const speed = lively ? 4.2 : mood === 'thinking' ? 1.1 : 1.7;
    const bob = Math.sin(t * speed) * (mood === 'champion' || mood === 'correct' ? .07 : .022);
    this.hop = mood === 'champion' ? Math.max(0, Math.sin(t * 3.1)) * .28
      : mood === 'correct' ? Math.max(0, Math.sin(t * 3.4)) * .18 : 0;
    // A short blink every few seconds, offset per team so the row never blinks together.
    const cycle = (t * .55) % 1;
    this.blink = cycle > .96 ? .12 : 1;
    // The prop swings a little at rest and is brandished when the team is winning.
    this.applyPose(bob, Math.sin(t * speed * .5) * .05, Math.sin(t * (lively ? 5.4 : 1.3)) * (lively ? .34 : .07));
    this.applyFace();
  }
  private applyFace(): void {
    // Upright the half-torus reads as a frown; flipped it reads as a smile.
    this.mouth.rotation.z = this.curve >= 0 ? Math.PI : 0;
    this.mouth.scale.set(1, Math.max(.18, Math.abs(this.curve)), 1);
    this.brows.forEach((brow, i) => {
      const side = i ? 1 : -1;
      brow.position.y = .125 + this.brow * .035;
      brow.rotation.z = side * this.brow * -.35;
    });
    for (const pupil of this.pupils) pupil.scale.y = this.blink;
  }
  private applyPose(bob: number, sway: number, propSwing: number): void {
    this.body.position.y = bob + this.hop;
    this.body.rotation.x = this.lean;
    this.body.rotation.y = sway * (1 - this.raise);
    this.head.rotation.x = -this.lean * .6;
    this.arms.forEach((arm, i) => {
      const side = i ? 1 : -1;
      // One arm shoots up on a buzz; both go up for a champion or a correct answer.
      const up = this.raise * (this.mood === 'champion' || this.mood === 'correct' || i === 1 ? 1 : .15);
      arm.rotation.x = -up * 2.5 - this.lean * .4;
      arm.rotation.z = side * (.12 + up * .35) + (this.mood === 'missed' ? side * .1 : 0);
    });
    this.prop.position.y = 1.62 + this.raise * .34;
    this.prop.rotation.z = this.propRest + propSwing - this.raise * .5;
    this.prop.rotation.x = -this.lean * .5;
  }
  private mesh(geometry: THREE.BufferGeometry, material: THREE.Material): THREE.Mesh {
    this.geometries.push(geometry); return new THREE.Mesh(geometry, material);
  }
  private material(color: string, emissive: number): THREE.MeshStandardMaterial {
    const material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: emissive, roughness: .62, metalness: .06 });
    this.materials.push(material); return material;
  }
  dispose(): void {
    this.geometries.forEach(geometry => geometry.dispose());
    this.materials.forEach(material => material.dispose());
  }
}

export function avatarMood(phase: string, teamId: string, firstBuzzId: string | null, winnerId: string | null,
  answered: boolean, verdict: 'correct' | 'miss' | null = null): AvatarMood {
  if (phase === 'champion') return winnerId === teamId ? 'champion' : 'missed';
  if (verdict) return verdict === 'correct' ? 'correct' : 'missed';
  if (firstBuzzId === teamId && ['open', 'paused', 'locked'].includes(phase)) return 'buzzed';
  if (answered) return 'answered';
  if (['open', 'paused'].includes(phase)) return 'thinking';
  if (['ready', 'bracket'].includes(phase)) return 'ready';
  return 'idle';
}
