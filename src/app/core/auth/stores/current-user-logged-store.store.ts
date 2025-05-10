import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserLoggedStore {

  constructor() { }

  public isLoggedIn(): boolean {
    return true; //mock response
  }
}
