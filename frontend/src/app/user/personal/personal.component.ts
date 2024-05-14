import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserDetail} from "../../shared/interfaces/user.interfaces";
import {catchError, take, tap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {
  constructor(private userService: UserService) {
  }

  user!: UserDetail
  personalForm!: FormGroup;
  isSaving: boolean = false

  ngOnInit() {
    this.userService.getCurrenUser().pipe(
      take(1),
      tap(user => {
        this.user = user
        this.personalForm = new FormGroup({
          lastName: new FormControl(this.user?.last_name),
          firstName: new FormControl(this.user?.first_name),
          patronymic: new FormControl(this.user?.patronymic),
          birthDate: new FormControl(this.user?.birthday_date),
          phone: new FormControl(this.user?.phone_number),
        });
      })
    ).subscribe()
  }

  save() {
    if (this.personalForm.valid) {
      this.isSaving = true
      const userData: UserDetail = {
        id: this.user.id,
        first_name: this.personalForm.value['firstName'],
        last_name: this.personalForm.value['lastName'],
        patronymic: this.personalForm.value['patronymic'],
        birthday_date: this.personalForm.value['birthDate'],
        phone_number: this.personalForm.value['phone'],
        email: this.user.email
      };
      this.userService.updateCurrenUser(userData).pipe(
        take(1),
        tap(response => {
          this.isSaving = false
          this.user = userData
        }),
        catchError(error => {
          alert('Ошибка. ' + error)
          return of(null); // Возвращаем Observable, который выпускает `null`, это предотвращает "краш" потока.
        })
      ).subscribe()
    }
  }

  isSavingButtonDisabled() {
    return this.isSaving || (
      this.user.phone_number == this.personalForm.value['phone'] &&
      this.user.last_name == this.personalForm.value['lastName'] &&
      this.user.first_name == this.personalForm.value['firstName'] &&
      this.user.patronymic == this.personalForm.value['patronymic'] &&
      this.user.birthday_date == this.personalForm.value['birthDate']
    )
  }
}
