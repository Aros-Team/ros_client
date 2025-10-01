import { Routes } from '@angular/router';
import { App } from './app';
import { Header } from './components/header/header';
import { InputText } from './components/input-text/input-text';
import { LoginForm } from './authentication/login-form';

export const routes: Routes = [
    {
        path: "",
        component: InputText
    },
    {
        path: "app",
        component: Header
    },
    {
        path: "login",
        component: LoginForm
    }
];
