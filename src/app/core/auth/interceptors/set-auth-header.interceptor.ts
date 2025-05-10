import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CurrentUserLoggedStore } from '../stores/current-user-logged-store.store';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';

export const setAuthHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUserLoggedStore = inject(CurrentUserLoggedStore)

  if (!currentUserLoggedStore.isLoggedIn()) {
    return next(req);
  }

  const authTokenStorageService = inject(AuthTokenStorageService)
  const token = authTokenStorageService.get()

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(req)
};
