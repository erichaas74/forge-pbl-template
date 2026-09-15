import { describe, expect, it, vi } from 'vitest';
import { BoxGeometry, Group, Mesh, MeshStandardMaterial, Texture } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { requireSpatialManifest, type SpatialAssetManifest } from './spatial-asset.contract';
import { mountSpatialAsset } from './spatial-asset';
import { loadSpatialAsset } from './spatial-asset.loader';

const manifest: SpatialAssetManifest = { version: 1, src: '/projects/test/workshop.glb', nodes: [{ name: 'INT_canoe', kind: 'target' }, { name: 'SOCKET_inspect', kind: 'socket' }], clips: [] };
function fixture() {
  const scene = new Group(), geometry = new BoxGeometry(), texture = new Texture(), material = new MeshStandardMaterial({ map: texture });
  const mesh = new Mesh(geometry, material); mesh.name = 'INT_canoe'; mesh.position.set(1, 2, 3);
  const socket = new Group(); socket.name = 'SOCKET_inspect'; scene.add(mesh, socket);
  return { scene, scenes: [scene], animations: [], mesh, geometry, material, texture };
}
describe('Spatial asset foundation', () => {
  it('rejects remote/traversal paths, mismatched names and duplicates before loading', async () => {
    const transport = { load: vi.fn() };
    for (const src of ['https://example.com/a.glb', '/projects/test/../a.glb', '/projects/test/%2e%2e/a.glb']) await expect(loadSpatialAsset({ ...manifest, src }, undefined, transport)).rejects.toThrow('INVALID_SPATIAL_MANIFEST');
    expect(transport.load).not.toHaveBeenCalled();
    expect(() => requireSpatialManifest({ ...manifest, nodes: [{ name: 'ENV_canoe', kind: 'target' }] })).toThrow('INVALID_SPATIAL_MANIFEST');
    expect(() => requireSpatialManifest({ ...manifest, nodes: [...manifest.nodes, manifest.nodes[0]] })).toThrow('INVALID_SPATIAL_MANIFEST');
  });
  it('binds semantic targets without changing imported local transforms and disposes shared resources once', () => {
    const asset = fixture(); const duplicate = asset.mesh.clone(); duplicate.name = 'ENV_copy'; asset.scene.add(duplicate);
    const releases = [asset.geometry, asset.material, asset.texture].map(value => vi.spyOn(value, 'dispose'));
    const mounted = mountSpatialAsset(asset, manifest);
    expect(mounted.nodes.get('INT_canoe')).toBe(asset.mesh);
    mounted.pivot.position.x = 5;
    expect(asset.mesh.position.toArray()).toEqual([1, 2, 3]);
    mounted.dispose(); mounted.dispose();
    releases.forEach(release => expect(release).toHaveBeenCalledTimes(1));
  });
  it('rejects ambiguous nodes and releases a failed import', () => {
    const asset = fixture(); asset.scene.add(asset.mesh.clone()); const release = vi.spyOn(asset.geometry, 'dispose');
    expect(() => mountSpatialAsset(asset, manifest)).toThrow('ambiguous node'); expect(release).toHaveBeenCalledOnce();
  });
  it('rejects empty targets, nonempty sockets and missing animation clips', () => {
    const empty = fixture(); empty.mesh.name = 'ENV_other'; const target = new Group(); target.name = 'INT_canoe'; empty.scene.add(target);
    expect(() => mountSpatialAsset(empty, manifest)).toThrow('Target has no geometry');
    const socket = fixture(); socket.scene.getObjectByName('SOCKET_inspect')!.add(new Group());
    expect(() => mountSpatialAsset(socket, manifest)).toThrow('Socket is not empty');
    expect(() => mountSpatialAsset(fixture(), { ...manifest, clips: ['working'] })).toThrow('invalid clip');
  });
  it('disposes late loads after cancellation and never starts an already cancelled request', async () => {
    const controller = new AbortController(), asset = fixture(); const release = vi.spyOn(asset.texture, 'dispose');
    await expect(loadSpatialAsset(manifest, controller.signal, { async load() { controller.abort(); return asset; } })).rejects.toThrow('SPATIAL_LOAD_ABORTED');
    expect(release).toHaveBeenCalledOnce();
    const transport = { load: vi.fn() };
    await expect(loadSpatialAsset(manifest, controller.signal, transport)).rejects.toThrow('SPATIAL_LOAD_ABORTED');
    expect(transport.load).not.toHaveBeenCalled();
  });
  it('reports a structured transport failure', async () => {
    await expect(loadSpatialAsset(manifest, undefined, { async load() { throw new Error('network'); } })).rejects.toThrow('SPATIAL_LOAD_FAILED');
  });
  it('hydrates actual glTF geometry through GLTFLoader before semantic binding', async () => {
    // Test-only triangle, never exported as a student scene.
    const bytes = new Uint8Array(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]).buffer);
    const document = { asset: { version: '2.0' }, scene: 0, scenes: [{ nodes: [0, 1] }], nodes: [{ name: 'INT_canoe', mesh: 0 }, { name: 'SOCKET_inspect' }], meshes: [{ primitives: [{ attributes: { POSITION: 0 } }] }], buffers: [{ uri: 'data:application/octet-stream;base64,' + btoa(String.fromCharCode(...bytes)), byteLength: bytes.length }], bufferViews: [{ buffer: 0, byteLength: bytes.length }], accessors: [{ bufferView: 0, componentType: 5126, count: 3, type: 'VEC3', min: [0, 0, 0], max: [1, 1, 0] }] };
    const imported = await new GLTFLoader().parseAsync(JSON.stringify(document), '');
    const mounted = mountSpatialAsset(imported, manifest);
    expect((mounted.nodes.get('INT_canoe') as Mesh).geometry.getAttribute('position').count).toBe(3);
    mounted.dispose();
  });
});
