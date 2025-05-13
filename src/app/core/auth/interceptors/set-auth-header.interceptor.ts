import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CurrentUserLoggedStore } from '../stores/current-user-logged-store.store';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';
import { catchError, switchMap, throwError, of } from 'rxjs';
import { LoginUserFacade } from '../facades/login-user.facade';

export const setAuthHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const isLoggedIn = inject(CurrentUserLoggedStore).isLoggedIn();
  const tokenStorage = inject(AuthTokenStorageService);
  const loginFacade = inject(LoginUserFacade);

  const addAuthHeader = (token: string) =>
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

  const goToNext = (err: any) => {
    const newToken = tokenStorage.get();
    if (!newToken) return throwError(() => err);
    return next(req);
  }

  const requestWithAuth = isLoggedIn ? addAuthHeader(tokenStorage.get()!) : req;

  return next(requestWithAuth).pipe(
    catchError(err => {
      if (err.status !== 401) return throwError(() => err);

      return loginFacade.refreshToken().pipe(
        switchMap(() => goToNext(err)),
        catchError(() => throwError(() => err))
      );
    })
  );
};


