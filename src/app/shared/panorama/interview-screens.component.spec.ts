import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InterviewScreensComponent } from './interview-screens.component';
import { requirePanorama } from './panorama.validation';
import fixture from '../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';

describe('Interview screens', () => {
  afterEach(() => { TestBed.resetTestingModule(); vi.restoreAllMocks(); });
  it('shows three clearly pending interviews without a fake player or request to missing media', () => {
    const f=TestBed.createComponent(InterviewScreensComponent);
    f.componentRef.setInput('interviews',fixture.previewWeeks.scenes[0].interviews);f.detectChanges();
    const buttons=[...f.nativeElement.querySelectorAll('.screen')] as HTMLButtonElement[];
    expect(buttons).toHaveLength(3);
    expect(buttons.every(button=>button.disabled&&button.textContent?.includes('Video pending'))).toBe(true);
    expect(f.nativeElement.querySelector('video')).toBeNull();
  });
  it('opens supplied media, includes captions, and pauses on return without replacing the scene', () => {
    const f=TestBed.createComponent(InterviewScreensComponent);
    const interview={id:'farmer',title:'Crop Farmer',poster:'/projects/test/farmer.png',video:{src:'/projects/test/interview.mp4',captions:'/projects/test/interview.vtt'}};
    f.componentRef.setInput('interviews',[interview]);f.detectChanges();
    const dialog=f.nativeElement.querySelector('dialog') as HTMLDialogElement;
    // The test DOM does not implement native dialog methods.
    const show=vi.fn();Object.assign(dialog,{showModal:show,close:vi.fn()});
    const trigger=f.nativeElement.querySelector('.screen') as HTMLButtonElement;
    trigger.click();f.detectChanges();expect(show).toHaveBeenCalledOnce();
    const video=f.nativeElement.querySelector('video') as HTMLVideoElement;
    expect(video.getAttribute('src')).toBe(interview.video.src);
    expect(video.querySelector('track')?.getAttribute('src')).toBe(interview.video.captions);
    const pause=vi.spyOn(video,'pause').mockImplementation(()=>{});
    f.componentInstance.close();f.detectChanges();
    expect(pause).toHaveBeenCalledOnce();expect(f.nativeElement.querySelector('video')).toBeNull();
    expect(f.nativeElement.querySelector('.screen')).toBe(trigger);
  });
  it('rejects invalid interview media paths', () => {
    const scene=fixture.previewWeeks.scenes[0];
    expect(()=>requirePanorama({...scene,interviews:[{id:'farmer',title:'Farmer',poster:scene.panorama,video:{src:'javascript:alert(1)',captions:'/projects/test/captions.vtt'}}]})).toThrow('interview media');
  });
});
