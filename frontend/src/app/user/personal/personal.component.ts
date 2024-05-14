import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {
  constructor() {
  }

  personalForm!: FormGroup;

  ngOnInit() {
    this.personalForm = new FormGroup({
      lastName: new FormControl('Едынак'),
      firstName: new FormControl('Мария'),
      middleName: new FormControl('Игоревна'),
      birthDate: new FormControl('2002-05-16'),
      phone: new FormControl('+7 (914) 779-55-35'),
      email: new FormControl('v4L.mari@yandex.ru')
    });
  }

  save() {

  }
}
