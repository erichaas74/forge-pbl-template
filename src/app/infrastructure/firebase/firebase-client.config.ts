import type { FirebaseOptions } from 'firebase/app';

/**
 * Firebase web configuration contains public project identifiers, not server
 * credentials. Authorization is still enforced by Firebase Authentication,
 * Security Rules, App Check, and server-side command handlers.
 */
export const firebaseClientConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBybgpWEyRWxp0EIAEozwhUuhpIdkcjrSE',
  authDomain: 'livelessondemogames.firebaseapp.com',
  databaseURL: 'https://livelessondemogames-default-rtdb.firebaseio.com',
  projectId: 'livelessondemogames',
  storageBucket: 'livelessondemogames.firebasestorage.app',
  messagingSenderId: '672402495241',
  appId: '1:672402495241:web:ed1a7048b655b85891e5d8',
  measurementId: 'G-DFR6PJ01KL',
};
