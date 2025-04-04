import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

enum EmployeeOptions {
  EMPLOYEE = 'employee',
  DEPENDENT = 'dependent',
}

enum DrinkOptions {
  COKE = 'coke',
  PEPSI = 'pepsi',
  BEER = 'beer',
  VODKA = 'vodka',
}

@Component({
  selector: 'app-second-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './second-form.component.html',
  styleUrl: './second-form.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SecondFormComponent {
  reservationForm: FormGroup;
  employeeStatuses = [
    { name: 'I am an employee', value: EmployeeOptions.EMPLOYEE },
    { name: 'I am a dependent', value: EmployeeOptions.DEPENDENT },
  ];
  drinks = [
    { name: 'Coke', value: DrinkOptions.COKE },
    { name: 'Pepsi', value: DrinkOptions.PEPSI },
    { name: 'Beer', value: DrinkOptions.BEER },
    { name: 'Vodka', value: DrinkOptions.VODKA },
  ];
  softDrinks = [
    { name: 'Coke', value: DrinkOptions.COKE },
    { name: 'Pepsi', value: DrinkOptions.PEPSI },
  ];

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      isEmployee: ['', Validators.required],
      invitingEmployeeId: [''],
      drink: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log('Form submitted:', this.reservationForm.value);
    } else {
      console.warn('Form is invalid');
    }
  }
}
