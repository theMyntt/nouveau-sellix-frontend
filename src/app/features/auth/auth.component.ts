import { Component, inject, signal } from '@angular/core';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { iUser, iUserCredentials } from '../../core/auth/interfaces/user.interface';
import { RedirectCommand, Router } from '@angular/router';
import { iError } from '../../core/auth/interfaces/error.interface';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private readonly loginFacade = inject(LoginUserFacade)
  private readonly router = inject(Router)
  private readonly dialog = inject(MatDialog)

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
        this.handleApiError(res)
        return
      }

      this.router.navigate(["/"])
    })
  }

  private handleApiError(res: iError) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        errorMessage: res.message
      }
    })
  }
}
