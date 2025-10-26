import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { ProductCreationForm } from './features/admin/creation/product-creation-form';
import { Login } from './areas/login/login';

export const routes: Routes = [
  {
    path: 'app',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'admin',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create-product',
        component: ProductCreationForm,
      },
    ],
  },
];