
/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitudtutoria-form',
  imports: [],
  templateUrl: './solicitudtutoria-form.html',
  styleUrl: './solicitudtutoria-form.scss'
})
export class SolicitudtutoriaForm {

}*/


import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Solicitudestutoriastgu } from '../../services/solicitudestutoriastgu';

@Component({
  selector: 'app-solicitudtutoria-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './solicitudtutoria-form.html',
  styleUrl: './solicitudtutoria-form.scss'
})
export class SolicitudtutoriaForm{

private solicitudesService = inject(Solicitudestutoriastgu);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  solicitudForm: FormGroup;
  loading = false;

  constructor() {
    this.solicitudForm = this.fb.group({
      clase: ['', [Validators.required, Validators.minLength(3)]],
      temas: ['', [Validators.required, Validators.minLength(10)]],
      demasAlumnos: ['']
    });
  }

  async onSubmit() {
    if (this.solicitudForm.invalid) {
      this.marcarCamposComoTocados();
      return;
    }

    this.loading = true;

    try {
      await this.solicitudesService.crearSolicitud(this.solicitudForm.value);
      
      Swal.fire({
        icon: 'success',
        title: '¡Solicitud enviada!',
        text: 'Tu solicitud de tutoría ha sido enviada correctamente.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/tutorias']); // Redirigir a donde quieras
      });

    } catch (error) {
      console.error('Error enviando solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar la solicitud. Intenta nuevamente.',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      this.loading = false;
    }
  }

  private marcarCamposComoTocados() {
    Object.keys(this.solicitudForm.controls).forEach(key => {
      this.solicitudForm.get(key)?.markAsTouched();
    });
  }

  get f() {
    return this.solicitudForm.controls;
  }
}
