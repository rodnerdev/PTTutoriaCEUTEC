
/*
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

}
*/


import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterOutlet,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AutenticacionService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const { email, password } = this.loginForm.value;

    try {
      const credencial = await this.authService.iniciarSesion(email, password);
      console.log('Login exitoso:', credencial.user?.email);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  private handleError(error: any): void {
    const errorMap: { [key: string]: string } = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/user-disabled': 'Cuenta deshabilitada'
    };

    this.errorMessage = errorMap[error.code] || 'Error al iniciar sesión. Intenta nuevamente.';
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}