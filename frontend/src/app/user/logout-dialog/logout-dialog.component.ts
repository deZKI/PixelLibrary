import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss'
})
export class LogoutDialogComponent {

  constructor(
    private authService: AuthService, private router: Router,
    private dialogRef: MatDialogRef<LogoutDialogComponent>) {
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/');
    this.dialogRef.close()
  }

  cancel() {
    this.dialogRef.close()
  }
}
