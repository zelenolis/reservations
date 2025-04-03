import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/main-form/main-form.component').then(
        (mod) => mod.MainFormComponent,
      ),
  },
];
