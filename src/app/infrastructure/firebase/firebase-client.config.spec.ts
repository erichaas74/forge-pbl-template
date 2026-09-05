import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { FIREBASE_APP, firebaseClientConfig, provideFirebase } from './index';

describe('Firebase client configuration', () => {
  it('contains the normalized Firebase project endpoints', () => {
    expect(firebaseClientConfig.projectId).toBe('livelessondemogames');
    expect(firebaseClientConfig.databaseURL).toBe(
      'https://livelessondemogames-default-rtdb.firebaseio.com',
    );
    expect(firebaseClientConfig.databaseURL).not.toContain('](');
  });

  it('provides the configured Firebase app through Angular DI', () => {
    TestBed.configureTestingModule({
      providers: [provideFirebase(firebaseClientConfig)],
    });

    expect(TestBed.inject(FIREBASE_APP).options.projectId).toBe('livelessondemogames');
  });
});
