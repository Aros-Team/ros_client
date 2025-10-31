import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth-guard';
import { RoleGuard } from '@core/guards/role-guard';
import { RedirectGuard } from '@app/core/guards/redirect-guard';
import { ProductCreationForm } from '@features/admin/creation/product-creation-form';
import { Login } from '@areas/login/login-area';
import { AdminArea } from '@areas/admin/admin-area';
import { WorkerArea } from '@areas/worker/worker-area';

export const routes: Routes = [

  {
    path: 'login',
    component: Login,
    canActivate: [RedirectGuard],
  },
  {
    path: 'admin',
    component: AdminArea,
    canActivate: [AuthGuard, RoleGuard],
    children: [
      {
        path: 'create-product',
        component: ProductCreationForm,
      },
    ],
  },
  {
    path: 'worker',
    component: WorkerArea,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: '**',
    redirectTo: '/login'

  }
];
