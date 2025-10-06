import { Component } from '@angular/core';
import { LoginForm } from '../../components/authentication/login-form';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
