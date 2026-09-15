import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { TimingCagePresentation } from '../machine.models';
import { cagePose } from './timing-cage.motion';

export interface AnimatedCageAnimal {
  update(release: number, dt: number, reduced: boolean): void;
  destroy(): void;
}
export async function loadCageAnimal(
  parent: T.Group,
  definition: TimingCagePresentation['animal'],
): Promise<AnimatedCageAnimal> {
  const gltf = await new GLTFLoader().loadAsync(definition.model);
  const model = gltf.scene;
  const mixer = new T.AnimationMixer(model);
  const clips = [definition.idle, definition.walk, definition.run].map((name) => {
    const clip = gltf.animations.find((a) => a.name === name);
    if (!clip) throw new Error(`Animal animation missing: ${name}`);
    return mixer.clipAction(clip);
  });
  model.updateMatrixWorld(true);
  const box = new T.Box3().setFromObject(model),
    size = box.getSize(new T.Vector3());
  const scale = 1.65 / Math.max(size.y, 0.001);
  const pivot = new T.Group();
  pivot.add(model);
  parent.add(pivot);
  model.scale.setScalar(scale);
  model.position.set(
    (-(box.min.x + box.max.x) * scale) / 2,
    -box.min.y * scale,
    (-(box.min.z + box.max.z) * scale) / 2,
  );
  model.traverse((o) => {
    if (o instanceof T.Mesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  const path = new T.CatmullRomCurve3(
    [
      new T.Vector3(3.65, 0.44, 0.2),
      new T.Vector3(3.65, 0.44, 1.9),
      new T.Vector3(4.0, 0.18, 3.6),
      new T.Vector3(5.1, 0.18, 4.55),
      new T.Vector3(6.7, 0.18, 4.55),
    ],
    false,
    'centripetal',
  );
  let active = 0;
  clips[0].play();
  const change = (next: number, reduced: boolean) => {
    if (active === next) return;
    if (reduced) clips[active].stop();
    else clips[active].fadeOut(0.22);
    clips[next]
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(reduced ? 0 : 0.22)
      .play();
    active = next;
  };
  let destroyed = false;
  return {
    update(release, dt, reduced) {
      const progress = cagePose(release).animal;
      const traveling = progress > 0 && progress < 1;
      change(traveling ? (progress < 0.4 ? 1 : 2) : 0, reduced);
      parent.position.copy(path.getPointAt(progress));
      const tangent = path.getTangentAt(Math.max(0.001, Math.min(0.999, progress)));
      parent.rotation.y = traveling
        ? Math.atan2(tangent.x, tangent.z)
        : progress === 1
          ? 0.55
          : 0.18;
      // Scale the gait tempo to travel speed so feet visibly accompany movement.
      clips[1].setEffectiveTimeScale(0.7);
      clips[2].setEffectiveTimeScale(0.6);
      if (!reduced && dt > 0) mixer.update(dt);
      else if (reduced) {
        clips[active].time = 0;
        mixer.update(0);
      }
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      mixer.stopAllAction();
      mixer.uncacheRoot(model);
      parent.remove(pivot);
      const textures = new Set<T.Texture>(),
        materials = new Set<T.Material>(),
        geometries = new Set<T.BufferGeometry>();
      model.traverse((object) => {
        if (!(object instanceof T.Mesh)) return;
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material)
          ? object.material
          : [object.material]) {
          materials.add(material);
          for (const value of Object.values(material))
            if (value instanceof T.Texture) textures.add(value);
        }
        if (object instanceof T.SkinnedMesh) object.skeleton.dispose();
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => {
        const image = t.source.data;
        if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) image.close();
        t.dispose();
      });
    },
  };
}
