import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './services/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {LoginRegisterDialogComponent} from "./user/login-register-dialog/login-register-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router,
              private dialog: MatDialog) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Сохраняем URL, с которого был сделан запрос
      this.openLoginDialog();
      localStorage.setItem('returnUrl', state.url);
      return false;
    }
  }

  openLoginDialog(): void {
    this.dialog.open(LoginRegisterDialogComponent, {
      maxWidth: '100%',
      width: '25vw',
      minWidth: '320px'
    });
  }

}
