import { describe, expect, it } from 'vitest';
import { requireSpatialInspection } from './spatial-inspection.definition';
const definition={asset:{version:1,src:'/projects/example/model.glb',nodes:[{name:'INT_hull',kind:'target'}],clips:[]},targets:[{name:'INT_hull',label:'Interior',focus:[0,.6,0],distance:3}]};
describe('Spatial inspection configuration',()=>{
  it('accepts valid target geometry bindings',()=>expect(requireSpatialInspection(definition).targets[0].label).toBe('Interior'));
  it('rejects target references that do not exist in the asset contract',()=>expect(()=>requireSpatialInspection({...definition,targets:[{...definition.targets[0],name:'INT_missing'}]})).toThrow('INVALID_SPATIAL_INSPECTION'));
  it('rejects invalid camera positions, distances and duplicate targets',()=>{
    for(const change of [{focus:[0,Infinity,0]},{focus:[0,0]},{distance:0}])expect(()=>requireSpatialInspection({...definition,targets:[{...definition.targets[0],...change}]})).toThrow('INVALID_SPATIAL_INSPECTION');
    expect(()=>requireSpatialInspection({...definition,targets:[...definition.targets,...definition.targets]})).toThrow('INVALID_SPATIAL_INSPECTION');
  });
});
