import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyC1MzVrjaV058ZIVOwKZVnZU26JtN9hD8E",
        authDomain: "pttutoriaceutec.firebaseapp.com",
        projectId: "pttutoriaceutec",
        storageBucket: "pttutoriaceutec.firebasestorage.app",
        messagingSenderId: "823433460289",
        appId: "1:823433460289:web:6099cdc9330db3bd23a4c0",
        measurementId: "G-N0373LZRNH"
      })),


      provideFirestore(() => getFirestore()),
       provideAuth(() => getAuth()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
