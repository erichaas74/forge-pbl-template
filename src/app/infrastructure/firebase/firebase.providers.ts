import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  PLATFORM_ID,
  provideEnvironmentInitializer,
  type EnvironmentProviders,
} from '@angular/core';
import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions,
} from 'firebase/app';
export const FIREBASE_OPTIONS = new InjectionToken<FirebaseOptions>('FIREBASE_OPTIONS');
export const FIREBASE_APP = new InjectionToken<FirebaseApp>('FIREBASE_APP');

export interface FirebaseProviderOptions {
  readonly analytics?: boolean;
}

/**
 * Installs Firebase only at the application composition boundary. Templates and
 * project packages consume repository-owned adapters rather than these tokens.
 */
export function provideFirebase(
  options: FirebaseOptions,
  providerOptions: FirebaseProviderOptions = {},
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: FIREBASE_OPTIONS, useValue: options },
    {
      provide: FIREBASE_APP,
      useFactory: (firebaseOptions: FirebaseOptions): FirebaseApp =>
        getApps().length === 0 ? initializeApp(firebaseOptions) : getApp(),
      deps: [FIREBASE_OPTIONS],
    },
    provideEnvironmentInitializer(() => {
      if (providerOptions.analytics !== true || !isPlatformBrowser(inject(PLATFORM_ID))) {
        return;
      }

      const app = inject(FIREBASE_APP);
      void initializeAnalytics(app);
    }),
  ]);
}

async function initializeAnalytics(app: FirebaseApp): Promise<void> {
  try {
    const { getAnalytics, isSupported } = await import('firebase/analytics');
    if (await isSupported()) {
      getAnalytics(app);
    }
  } catch (error: unknown) {
    console.warn('Firebase Analytics could not be initialized.', error);
  }
}
