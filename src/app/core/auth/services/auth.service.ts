import { inject, Injectable } from '@angular/core';
import { API_URL } from '../tokens/api.token';
import { HttpClient } from '@angular/common/http';
import {
  iLoginResponse,
  iUser,
  iUserCredentials,
} from '../interfaces/user.interface';
import { map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = inject(API_URL);
  private readonly httpClient = inject(HttpClient);

  constructor() {}

  public login(payload: iUserCredentials): Observable<iUser> {
    const link = this.apiUrl + '/api/v1/login';

    return this.httpClient
      .post<iLoginResponse>(link, payload)
      .pipe(map((response) => jwtDecode<iUser>(response.token)));
  }
}
