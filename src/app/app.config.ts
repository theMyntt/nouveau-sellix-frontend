import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { API_URL } from './core/auth/tokens/api.token';
import { environment } from '../environments/environment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { authInitializerFactory } from './core/auth/initalizers/auth.initializer';
import { AuthService } from './core/auth/services/auth.service';
import { AuthTokenStorageService } from './core/auth/services/auth-token-storage.service';
import { CurrentUserLoggedStore } from './core/auth/stores/current-user-logged-store.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAppInitializer(authInitializerFactory()),
    {
      provide: API_URL,
      useValue: environment.apiUrl
    },
  ],
};
