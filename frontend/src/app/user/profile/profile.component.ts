import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialogComponent} from "../logout-dialog/logout-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  constructor(private dialog: MatDialog) {
  }

  logoutDialog() {
    this.dialog.open(LogoutDialogComponent, {
      maxWidth: '100%',
      minWidth: '320px'
    });
  }
}
