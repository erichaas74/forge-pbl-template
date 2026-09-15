import { afterEach, describe, expect, it, vi } from 'vitest';
import { BoxGeometry, Group, Mesh, MeshStandardMaterial, Scene, SRGBColorSpace, Texture, TextureLoader } from 'three';
import { installSpatialEnvironment } from './spatial-environment';
import { requireSpatialInspection } from './spatial-inspection.definition';
const config={background:'/projects/test/background.png',ground:'/projects/test/ground.png',groundNode:'ENV_ground',tileSize:3};
describe('Spatial image environment',()=>{
  afterEach(()=>vi.restoreAllMocks());
  it('maps image soil to geometry and restores original materials on disposal',async()=>{
    const background=new Texture<HTMLImageElement>(),soil=new Texture<HTMLImageElement>(),original=new Texture();
    const disposeBackground=vi.spyOn(background,'dispose'),disposeSoil=vi.spyOn(soil,'dispose');
    vi.spyOn(TextureLoader.prototype,'loadAsync').mockResolvedValueOnce(background).mockResolvedValueOnce(soil);
    const material=new MeshStandardMaterial({map:original,color:0x826043}),color=material.color.clone(),ground=new Mesh(new BoxGeometry(6,.1,6),material),scene=new Scene();
    const mounted={pivot:new Group(),nodes:new Map([['ENV_ground',ground]]),clips:new Map(),dispose:()=>{}};
    const release=await installSpatialEnvironment(scene,mounted,config,new AbortController().signal);
    expect(scene.background).toBe(background);expect(material.map).toBe(soil);expect(soil.colorSpace).toBe(SRGBColorSpace);expect(ground.geometry.getAttribute('uv').count).toBe(ground.geometry.getAttribute('position').count);
    release();release();expect(material.map).toBe(original);expect(material.color.equals(color)).toBe(true);expect(disposeBackground).toHaveBeenCalledOnce();expect(disposeSoil).toHaveBeenCalledOnce();
  });
  it('releases successful image loads when the other image fails',async()=>{
    const image=new Texture<HTMLImageElement>(),dispose=vi.spyOn(image,'dispose');
    vi.spyOn(TextureLoader.prototype,'loadAsync').mockResolvedValueOnce(image).mockRejectedValueOnce(new Error('missing'));
    const mounted={pivot:new Group(),nodes:new Map(),clips:new Map(),dispose:()=>{}};
    await expect(installSpatialEnvironment(new Scene(),mounted,config,new AbortController().signal)).rejects.toThrow('SPATIAL_ENVIRONMENT_LOAD_FAILED');expect(dispose).toHaveBeenCalledOnce();
  });
  it('rejects external image paths and nonexistent ground bindings',()=>{
    const definition={asset:{version:1,src:'/projects/test/model.glb',nodes:[{name:'INT_crop',kind:'target'},{name:'ENV_ground',kind:'environment'}],clips:[]},targets:[{name:'INT_crop',label:'Crop',focus:[0,0,0],distance:2}],environment:config};
    expect(requireSpatialInspection(definition).environment).toEqual(config);
    for(const override of [{background:'https://example.com/a.png'},{groundNode:'ENV_missing'},{tileSize:0}])expect(()=>requireSpatialInspection({...definition,environment:{...config,...override}})).toThrow('INVALID_SPATIAL_ENVIRONMENT');
  });
});
