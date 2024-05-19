import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { catchError, take, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-login-register-dialog',
  templateUrl: './login-register-dialog.component.html',
  styleUrls: ['./login-register-dialog.component.scss']
})
export class LoginRegisterDialogComponent {
  email = '';
  password = '';
  isLoginMode = true;
  errorMessage = '';
  fieldErrors: { [key: string]: string } = {};

  constructor(
    private authService: AuthService, private router: Router,
    public dialogRef: MatDialogRef<LoginRegisterDialogComponent>) { }

  changeMode() {
    this.errorMessage = '';
    this.fieldErrors = {};
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.fieldErrors = {};
    const authOperation = this.isLoginMode ? this.login() : this.register();

    authOperation.pipe(
      take(1),
      catchError(error => {
        this.handleError(error);
        return EMPTY;
      }),
      tap(() => {
        const redirectUrl = this.isLoginMode ? localStorage.getItem('returnUrl') || '/' : '/';
        this.router.navigateByUrl(redirectUrl);
        this.dialogRef.close();
      }),
    ).subscribe();
  }

  private login() {
    return this.authService.login(this.email, this.password);
  }

  private register() {
    return this.authService.register(this.email, this.password);
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.error && typeof error.error === 'object') {
      // Handle field-specific errors
      this.fieldErrors = error.error;
    } else {
      // Handle non-field-specific errors
      this.errorMessage = 'Ошибка: ' + (error.error['detail'] ? error.error['detail'] : error.message);
    }
  }
}
