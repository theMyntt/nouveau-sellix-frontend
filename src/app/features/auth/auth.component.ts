import { Component, inject, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { LoginUserFacade } from '../../core/auth/facades/login-user.facade';
import { iUser, iUserCredentials } from '../../core/auth/interfaces/user.interface';
import { RedirectCommand, Router } from '@angular/router';
import { iError } from '../../core/auth/interfaces/error.interface';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private readonly loginFacade = inject(LoginUserFacade)
  private readonly router = inject(Router)

  protected showPassword = signal<boolean>(false)
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  protected updateShowPassword(event: Event) {
    this.showPassword.update(value => !value)
  }

  protected login() {
    if (this.loginForm.invalid) {
      return
    }

    const { email, password } = this.loginForm.value
    const credentials: iUserCredentials = {
      email: email ?? "",
      password: password ?? ""
    }

    this.loginFacade.login(credentials).subscribe((res) => {
      if ("message" in res) {
        console.log(res)
        return
      }

      this.router.navigate(["/"])
    })
  }
}
