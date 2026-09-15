import * as T from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import type { GearLockDefinition } from '../gear-lock.domain';
import { foxRoute } from './gear-cage.motion';

export interface FoxPack {
  update(seconds: number, dt: number, reduced: boolean): number;
  destroy(): void;
}
/** Load once, clone independent skeletons, share immutable geometry/materials, and dispose once. */
export async function loadFoxPack(
  parent: T.Group,
  p: NonNullable<GearLockDefinition['presentation']>,
): Promise<FoxPack> {
  const asset = await new GLTFLoader().loadAsync(p.animal.model);
  const geometries = new Set<T.BufferGeometry>(),
    materials = new Set<T.Material>(),
    textures = new Set<T.Texture>();
  asset.scene.traverse((o) => {
    if (!(o instanceof T.Mesh)) return;
    geometries.add(o.geometry);
    for (const material of Array.isArray(o.material) ? o.material : [o.material]) {
      materials.add(material);
      for (const value of Object.values(material))
        if (value instanceof T.Texture) textures.add(value);
    }
  });
  const free = () => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => {
      const image = t.source.data;
      if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) image.close();
      t.dispose();
    });
    asset.scene.traverse((o) => {
      if (o instanceof T.SkinnedMesh) o.skeleton.dispose();
    });
  };
  const clips = [p.animal.idle, p.animal.walk, p.animal.run].map((name) =>
    asset.animations.find((clip) => clip.name === name),
  );
  if (clips.some((clip) => !clip)) {
    free();
    throw new Error('Fox animation clip missing');
  }
  asset.scene.updateMatrixWorld(true);
  const box = new T.Box3().setFromObject(asset.scene),
    size = box.getSize(new T.Vector3());
  const foxes = Array.from({ length: p.foxes }, (_, i) => {
    const root = new T.Group(),
      model = clone(asset.scene),
      scale = (1.35 + (i % 2) * 0.09) / size.y;
    model.scale.setScalar(scale);
    model.position.set(
      (-(box.min.x + box.max.x) * scale) / 2,
      -box.min.y * scale,
      (-(box.min.z + box.max.z) * scale) / 2,
    );
    model.traverse((o) => {
      if (o instanceof T.Mesh) o.castShadow = o.receiveShadow = true;
    });
    root.add(model);
    parent.add(root);
    const mixer = new T.AnimationMixer(model),
      actions = clips.map((c) => mixer.clipAction(c!));
    actions[0].play();
    actions[0].time = i * 0.47;
    return { root, model, mixer, actions, active: 0 };
  });
  let destroyed = false;
  return {
    update(seconds, dt, reduced) {
      let escaped = 0;
      foxes.forEach((fox, i) => {
        const route = foxRoute(i, seconds),
          moving = route.progress > 0 && route.progress < 1,
          next = moving ? (route.progress < 0.55 ? 1 : 2) : 0;
        if (next !== fox.active) {
          fox.actions[fox.active].fadeOut(reduced ? 0 : 0.2);
          fox.actions[next]
            .reset()
            .setEffectiveWeight(1)
            .fadeIn(reduced ? 0 : 0.2)
            .play();
          fox.active = next;
        }
        fox.root.position.set(route.x, 0.18, route.z);
        fox.root.rotation.y = route.escaped ? 0.12 * (i - 1.5) : 0;
        fox.actions[1].setEffectiveTimeScale(0.83);
        fox.actions[2].setEffectiveTimeScale(0.65);
        if (reduced) {
          fox.actions[next].time = 0;
          fox.mixer.update(0);
        } else if (dt > 0) fox.mixer.update(dt);
        if (route.escaped) escaped++;
      });
      return escaped;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      foxes.forEach((fox) => {
        fox.mixer.stopAllAction();
        fox.mixer.uncacheRoot(fox.model);
        parent.remove(fox.root);
        fox.model.traverse((o) => {
          if (o instanceof T.SkinnedMesh) o.skeleton.dispose();
        });
      });
      free();
    },
  };
}
