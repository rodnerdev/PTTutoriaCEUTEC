
/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-registrar',
  imports: [],
  templateUrl: './registrar.html',
  styleUrl: './registrar.scss'
})
export class Registrar {

}
*/


import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from '../../services/autenticacion';


@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
    templateUrl: './registrar.html',
  styleUrl: './registrar.scss'
})
export class Registrar {
  private authService = inject(AutenticacionService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para confirmar contraseña
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword && confirmPassword.errors?.['passwordMismatch']) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
    }
    return null;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const { email, password } = this.registerForm.value;

    try {
      const credencial = await this.authService.registrarUsuario(email, password);
      this.successMessage = '¡Registro exitoso! Se ha enviado un correo de verificación a tu email.';
      console.log('Registro exitoso:', credencial.user?.email);
      
      // Opcional: Redirigir después de 3 segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  private handleError(error: any): void {
    const errorMap: { [key: string]: string } = {
      'auth/email-already-in-use': 'El correo electrónico ya está en uso',
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet'
    };

    this.errorMessage = errorMap[error.code] || 'Error al registrar. Por favor, intenta nuevamente.';
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Volver al login
  volverAlLogin(): void {
    this.router.navigate(['/login']);
  }

  // Getter para acceder fácilmente a los controles
  get f() {
    return this.registerForm.controls;
  }

  // Getter específico para errores de confirmación de password
  get passwordMismatchError(): boolean {
    return this.registerForm.errors?.['passwordMismatch'] && 
           this.f['confirmPassword'].touched;
  }
}

