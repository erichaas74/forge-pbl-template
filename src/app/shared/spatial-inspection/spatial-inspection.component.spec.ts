import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as T from 'three';
import { SpatialInspectionComponent } from './spatial-inspection.component';
describe('Spatial inspection camera controls',()=>{
  afterEach(()=>TestBed.resetTestingModule());
  function setup(){
    const f=TestBed.createComponent(SpatialInspectionComponent),c=f.componentInstance;
    f.componentRef.setInput('definition',{asset:{version:1,src:'/projects/test/a.glb',nodes:[],clips:[]},targets:[{name:'INT_rim',label:'Rim',focus:[.6,.9,0],distance:1.6}]});
    const camera=new T.PerspectiveCamera(),controls={target:new T.Vector3(),minDistance:4.3,maxDistance:11,update:vi.fn()};
    // Camera behavior is tested without a WebGL context. Renderer lifecycle is not simulated.
    Object.assign(c,{T,camera,controls});c.overview();return {c,camera,controls};
  }
  it('circles the canoe through a full turn without changing height or radius',()=>{
    const {c,camera,controls}=setup(),start=camera.position.clone(),radius=start.distanceTo(controls.target);
    for(let i=0;i<12;i++)c.step(Math.PI/6);
    expect(camera.position.distanceTo(start)).toBeLessThan(.00001);expect(camera.position.distanceTo(controls.target)).toBeCloseTo(radius);
  });
  it('focuses a selected detail, clamps zoom and restores the whole-canoe view',()=>{
    const {c,camera,controls}=setup();c.inspect('INT_rim');expect(c.selected()).toBe('Rim');expect(controls.target.toArray()).toEqual([.6,.9,0]);
    c.zoom(.001);expect(camera.position.distanceTo(controls.target)).toBeCloseTo(controls.minDistance);
    c.zoom(100);expect(camera.position.distanceTo(controls.target)).toBeCloseTo(11);
    c.overview();expect(c.selected()).toBe('');expect(controls.target.toArray()).toEqual([0,.6,0]);expect(camera.position.toArray()).toEqual([5,3.2,5.8]);
  });
  it('keeps keyboard vertical viewing above ground and handles escape',()=>{
    const {c,camera,controls}=setup();c.elevation(100);expect(new T.Spherical().setFromVector3(camera.position.clone().sub(controls.target)).phi).toBeCloseTo(1.3);
    c.inspect('INT_rim');const e=new KeyboardEvent('keydown',{key:'Escape',cancelable:true});c.key(e);expect(e.defaultPrevented).toBe(true);expect(c.selected()).toBe('');
  });
});
