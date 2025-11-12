import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },

  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./tasks/tasks-page.component').then((m) => m.TasksPageComponent),
  },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/dashboard-page.component').then(
        (m) => m.DashboardPageComponent
      ),
  },

  { path: '**', redirectTo: 'tasks' },
];
