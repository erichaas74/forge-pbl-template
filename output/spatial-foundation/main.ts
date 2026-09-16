import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SphericalViewComponent } from '../../src/app/shared/panorama/spherical-view.component';
import { requirePanorama } from '../../src/app/shared/panorama/panorama.validation';
import project from '../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { PanoramaEncounterComponent } from '../../src/app/shared/panorama/panorama-encounter.component';
import { InterviewScreensComponent } from '../../src/app/shared/panorama/interview-screens.component';
import { RestorationPreviewRuntime } from '../../src/app/templates/heist/restoration/weekly/restoration-preview.runtime';
import { RESTORATION_MISSION } from '../../src/app/templates/heist/restoration/restoration-collection.runtime';
import { requireRestorationMission } from '../../src/app/templates/heist/restoration/restoration-collection.validation';
import { LocalRestorationPreviewAdapter, RESTORATION_PREVIEW_SESSION, RESTORATION_PREVIEW_PERSISTENCE } from '../../src/app/templates/heist/restoration/weekly/restoration-preview.persistence';
import { createLocalPreviewSession } from '../../src/app/core/context/project-session-context';
const mission=requireRestorationMission(project),session=createLocalPreviewSession(mission.projectId,mission.projectVersion);
@Component({selector:'app-root',imports:[SphericalViewComponent,PanoramaEncounterComponent,InterviewScreensComponent],template:`@if(restore){<app-panorama-encounter [scene]="scene" [state]="runtime.sceneState(scene.id)" (action)="runtime.sceneAction(scene.id,$event)" />}@else{<div class="scene"><app-spherical-view [viewpoints]="views" [saved]="start" /><app-interview-screens [interviews]="scene.interviews ?? []" /></div>}`,styles:[`:host{display:block;max-width:1400px;margin:auto;padding:16px}.scene{position:relative;--interview-bottom:105px}`]})
class Preview{readonly runtime=inject(RestorationPreviewRuntime);readonly restore=new URLSearchParams(location.search).get('lesson')==='2';readonly scene=requirePanorama(project.previewWeeks.scenes[1]);readonly views=requirePanorama(project.previewWeeks.scenes[0]).viewpoints!;readonly start={viewpointId:'harvest',yaw:0,pitch:0,fov:75};}
bootstrapApplication(Preview,{providers:[RestorationPreviewRuntime,{provide:RESTORATION_MISSION,useValue:mission},{provide:RESTORATION_PREVIEW_SESSION,useValue:session},{provide:RESTORATION_PREVIEW_PERSISTENCE,useValue:new LocalRestorationPreviewAdapter(session,mission)}]}).catch(console.error);
