import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SphericalViewComponent } from '../../src/app/shared/panorama/spherical-view.component';
import { requirePanorama } from '../../src/app/shared/panorama/panorama.validation';
import project from '../../public/projects/shadow-gallery/versions/2.0.0/project.json';
@Component({selector:'app-root',imports:[SphericalViewComponent],template:`<main><h1>A morning on the shore</h1><p>Explore two places inside the village. Click their markers to enter a detailed panorama. Interviews are coming later.</p><app-spherical-view [viewpoints]="views" /></main>`,styles:[`main{max-width:1100px;margin:30px auto;padding:20px;background:#f7f2e4;color:#244237;border-radius:16px}h1{font-family:Georgia,serif}`]})
class Preview { readonly views = requirePanorama(project.previewWeeks.scenes[0]).viewpoints!; }
bootstrapApplication(Preview).catch(console.error);
