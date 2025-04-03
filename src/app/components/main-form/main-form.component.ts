import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

enum EmployeeOptions {
  EMPLOYEE = 'employee',
  DEPENDENT = 'dependent',
}

@Component({
  selector: 'app-main-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss',
})
export class MainFormComponent {
  reservationForm: FormGroup;
  employeeOptions = EmployeeOptions;
  drinks = [
    { name: 'Coke', value: 'coke' },
    { name: 'Pepsi', value: 'pepsi' },
    { name: 'Beer', value: 'Beer' },
    { name: 'Vodka', value: 'Vodka' },
  ];
  showDepAddForm = false;
  depButton = true;
  fullGroup = true;
  dependents$ = new BehaviorSubject<any[]>([]);

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      isEmployee: ['', Validators.required],
      dependents: this.fb.array([]),
      invitingEmployeeId: [''],
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log('Form submitted:', this.reservationForm.value);
    } else {
      this.markFormGroupTouched(this.reservationForm);
      console.warn('Form is invalid');
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  isDependentSelected() {
    if (
      this.reservationForm.get('name')?.value === '' ||
      this.reservationForm.get('surname')?.value === ''
    )
      return false;

    if (
      this.reservationForm.get('isEmployee')?.value ===
      this.employeeOptions.DEPENDENT
    ) {
      const inviter = this.reservationForm.get('invitingEmployee');
      inviter?.setValidators(Validators.required);
      inviter?.updateValueAndValidity();
      return true;
    }
    return false;
  }

  isEmployeeSelected() {
    if (
      this.reservationForm.get('name')?.value === '' ||
      this.reservationForm.get('surname')?.value === ''
    ) {
      return false;
    }
    if (
      this.reservationForm.get('isEmployee')?.value ===
      this.employeeOptions.EMPLOYEE
    ) {
      const inviter = this.reservationForm.get('invitingEmployee');
      inviter?.setValue('');
      inviter?.clearValidators();
      inviter?.updateValueAndValidity();
      return true;
    }
    return false;
  }

  createDependent(name: string = '', surname: string = ''): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      surname: [surname, Validators.required],
      drink: ['', Validators.required],
    });
  }

  isDependentsCreated() {
    const dependents = this.reservationForm.get('dependents') as FormArray;
    if (dependents.length > 0) return true;
    return false;
  }

  addDeps() {
    this.depButton = false;
    const dependents = this.reservationForm.get('dependents') as FormArray;
    if (dependents.length > 4) return;
    this.showDepAddForm = true;
  }

  closeAddDeps() {
    this.depButton = true;
    this.showDepAddForm = false;
  }

  onAddDep(depName: string, depSurname: string) {
    this.showDepAddForm = false;
    const dependents = this.reservationForm.get('dependents') as FormArray;
    if (dependents) {
      dependents.push(this.createDependent(depName, depSurname));
      this.dependents$.next(dependents.value);
      this.depButton = true;
      if (dependents.length > 4) {
        this.fullGroup = false;
      }
    }
  }

  delDeps(i: number) {
    const dependents = this.reservationForm.get('dependents') as FormArray;
    if (dependents) {
      dependents.removeAt(i);
      this.dependents$.next(dependents.value);
      if (dependents.length < 5) {
        this.fullGroup = true;
      }
    }
  }
}
