import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message'
import { AuthService } from '@services/authentication/auth-service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  imports: [ReactiveFormsModule,
            CommonModule,
            PasswordModule,
            MessageModule,
            FloatLabelModule,
            InputTextModule,
            ButtonModule],
})
export class LoginForm implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * form
   */
  form: FormGroup = new FormGroup({
    document: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  formStatus: 'Free' | 'Occuped' = 'Free';

  onSubmit() {
    this.formStatus = 'Occuped';

    this.authService
      .login({
        document: this.form.get('document')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/app']);
          this.formStatus = 'Free';
        },
        error: (err: unknown) => {
          console.error(err);
          this.authService.logout();
          this.formStatus = 'Free';
        },
      });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.authService.refresh()?.subscribe({
        next: () => {
          this.router.navigate(['/app']);
        },
        error: (err: unknown) => {
          this.authService.logout();
          console.error(err);
        },
      });
    }
  }

  isInvalid(value:string):boolean {
    return this.form.get(value)!.invalid && this.form.get(value)!.touched;
  }

  // Buttom signal
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
