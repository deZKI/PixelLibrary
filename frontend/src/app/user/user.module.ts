import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterDialogComponent } from './login-register-dialog/login-register-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import { ProfileComponent } from './profile/profile.component';
import {UserRoutingModule} from "./user-routing.module";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PaymentComponent } from './payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { PersonalComponent } from './personal/personal.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";



@NgModule({
  declarations: [
    LoginRegisterDialogComponent,
    ProfileComponent,
    PaymentComponent,
    OrdersComponent,
    PersonalComponent,
    LogoutDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatFormField,
    MatInput,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatIcon,
    FormsModule,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class UserModule { }
