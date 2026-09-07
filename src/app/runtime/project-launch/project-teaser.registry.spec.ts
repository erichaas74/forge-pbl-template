import { IllustratedComparisonComponent } from '../../plugins/intro-scenes/illustrated-comparison.component';
import { unlabeledShelfTeaser } from '../../projects/intro-scenes/unlabeled-shelf.teaser';
import { validateTeaser } from '../../shared/project-intro/project-teaser.models';
import {
  isIntroResponse,
  EMPTY_INTRO_RESPONSE,
} from '../../shared/project-intro/project-intro.models';
import { ProjectTeaserRegistry } from './project-teaser.registry';
import { DecisionSceneComponent } from '../../plugins/intro-scenes/decision-scene.component';
import { projectIntros } from '../../projects/project-intros';
import { frontierTeaser } from '../../projects/intro-scenes/frontier.teaser';
import { voyageTeaser } from '../../projects/intro-scenes/voyage.teaser';
import { isTeaserResult } from '../../shared/project-intro/project-teaser.models';

describe('opening scene capability', () => {
  it('validates every configured scene and registers the reusable decision renderer', () => {
    // project.intro permits an opening without a teaser. Validate every supplied scene.
    projectIntros.flatMap((config) => config.teaser ? [config.teaser] : []).forEach((teaser) =>
      expect(() => validateTeaser(teaser)).not.toThrow(),
    );
    expect(frontierTeaser.media.image).toBe('/project-intros/frontier/Opening-scene-image.png');
    expect(voyageTeaser.media.video).toBe('/project-intros/voyage/intro-launch-video.mp4');
    const registry = new ProjectTeaserRegistry();
    registry.register('decision-scene', DecisionSceneComponent);
    expect(registry.require('decision-scene')).toBe(DecisionSceneComponent);
  });

  it('rejects missing clip captions, duplicate choices, and malformed decision receipts', () => {
    expect(() =>
      validateTeaser({ ...voyageTeaser, media: { ...voyageTeaser.media, captions: undefined } }),
    ).toThrow('CONFIG_INVALID');
    expect(() =>
      validateTeaser({
        ...voyageTeaser,
        choices: [voyageTeaser.choices[0], voyageTeaser.choices[0]],
      }),
    ).toThrow('CONFIG_INVALID');
    const receipt = {
      eventType: 'projectIntro.teaserCompleted',
      teaserId: voyageTeaser.id,
      teaserVersion: voyageTeaser.version,
      timestamp: new Date().toISOString(),
      observations: [],
      choiceId: 'direct',
    };
    expect(isTeaserResult(receipt)).toBe(true);
    expect(isTeaserResult({ ...receipt, choiceId: 42 })).toBe(false);
    expect(isTeaserResult({ ...receipt, choiceId: '' })).toBe(false);
  });
  it('registers a renderer and rejects duplicate or missing capabilities', () => {
    expect(() => validateTeaser({ ...frontierTeaser, prologue: undefined })).not.toThrow();
    const registry = new ProjectTeaserRegistry();
    registry.register('illustrated-comparison', IllustratedComparisonComponent);
    expect(registry.require('illustrated-comparison')).toBe(IllustratedComparisonComponent);
    expect(() =>
      registry.register('illustrated-comparison', IllustratedComparisonComponent),
    ).toThrow('DUPLICATE_REGISTRATION');
    expect(() => registry.require('missing')).toThrow('CAPABILITY_NOT_INSTALLED');
  });

  it('rejects incomplete stories and unsafe narration paths', () => {
    for (const prologue of [
      { ...frontierTeaser.prologue!, title: '' },
      { ...frontierTeaser.prologue!, continueLabel: '' },
      { ...frontierTeaser.prologue!, dialogue: [] },
      {
        ...frontierTeaser.prologue!,
        dialogue: [{ speaker: 'Trader', text: 'Hello', audioUrl: '//external.test/voice.wav' }],
      },
      { ...frontierTeaser.prologue!, media: { image: '', alt: 'Missing image' } },
    ]) {
      expect(() => validateTeaser({ ...frontierTeaser, prologue })).toThrow('CONFIG_INVALID');
    }
  });

  it('validates configured dialogue, local clip URLs and sample evidence', () => {
    expect(() => validateTeaser(unlabeledShelfTeaser)).not.toThrow();
    expect(() => validateTeaser({ ...unlabeledShelfTeaser, samples: [] })).toThrow(
      'CONFIG_INVALID',
    );
    expect(() =>
      validateTeaser({
        ...unlabeledShelfTeaser,
        dialogue: {
          ...unlabeledShelfTeaser.dialogue,
          welcome: [{ speaker: 'scientist', text: 'Hello', audioUrl: '//example.com/voice.wav' }],
        },
      }),
    ).toThrow('CONFIG_INVALID');
  });

  it('keeps old response records valid and rejects malformed optional teaser receipts', () => {
    expect(isIntroResponse(EMPTY_INTRO_RESPONSE)).toBe(true);
    expect(
      isIntroResponse({ ...EMPTY_INTRO_RESPONSE, teaser: { eventType: 'unregistered' } }),
    ).toBe(false);
  });
});
