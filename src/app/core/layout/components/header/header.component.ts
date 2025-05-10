import { Component, inject, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CurrentUserLoggedStore } from '../../../auth/stores/current-user-logged-store.store';
import { iUser } from '../../../auth/interfaces/user.interface';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu'

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent{
  protected readonly currentUserLoggedStore = inject(CurrentUserLoggedStore);
}
