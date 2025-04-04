import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () =>
      import('./components/main-form/main-form.component').then(
        (mod) => mod.MainFormComponent,
      ),
  },
  {
    path: 'second',
    loadComponent: () =>
      import('./components/second-form/second-form.component').then(
        (mod) => mod.SecondFormComponent,
      ),
  },
];
