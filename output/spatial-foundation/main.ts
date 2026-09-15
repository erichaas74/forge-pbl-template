import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SphericalViewComponent } from '../../src/app/shared/panorama/spherical-view.component';
import { requirePanorama } from '../../src/app/shared/panorama/panorama.validation';
import project from '../../public/projects/shadow-gallery/versions/2.0.0/project.json';
@Component({selector:'app-root',imports:[SphericalViewComponent],template:`<app-spherical-view [viewpoints]="views" [saved]="start" />`,styles:[`:host{display:block;max-width:1400px;margin:auto;padding:16px}`]})
class Preview{readonly views=requirePanorama(project.previewWeeks.scenes[0]).viewpoints!;readonly start={viewpointId:'canoe',yaw:0,pitch:0,fov:75};}
bootstrapApplication(Preview).catch(console.error);
