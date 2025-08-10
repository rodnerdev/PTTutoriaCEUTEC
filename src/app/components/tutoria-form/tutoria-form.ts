/*

import { Component } from '@angular/core';

@Component({
  selector: 'app-tutoria-form',
  imports: [],
  templateUrl: './tutoria-form.html',
  styleUrl: './tutoria-form.scss'
})
export class TutoriaForm {

}*/


import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Tutoriastgu } from '../../services/tutoriastgu';

@Component({
  selector: 'app-tutoria-form',
  imports: [ReactiveFormsModule,RouterLink, RouterOutlet],
  templateUrl: './tutoria-form.html',
  styleUrl: './tutoria-form.scss'
})
export class TutoriaFormComponent {
  private tutoriasService = inject(Tutoriastgu);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  tutoriaForm: FormGroup;

  constructor() {
    this.tutoriaForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      cuerpo: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      horarios: ['', [Validators.required]],
      uuid: [null]
    });

    // Cargar datos si estamos en modo edición
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['tutoria']) {
      this.editarTutoria(state['tutoria']);
    }
  }

  guardarTutoria() {
    if (this.tutoriaForm.invalid) {
      Swal.fire('Error', 'Por favor completa todos los campos requeridos', 'error');
      return;
    }

    const formData = this.tutoriaForm.value;

    if (formData.uuid) {
      this.tutoriasService.updateTutoria({
        uuid: formData.uuid,
        titulo: formData.titulo,
        cuerpo: formData.cuerpo,
        lugar: formData.lugar,
        horarios: formData.horarios
      }).then(() => {
        Swal.fire('Éxito', 'Tutoría actualizada correctamente', 'success');
        this.router.navigate(['/tutorias-feed']);
      }).catch(error => {
        Swal.fire('Error', 'No se pudo actualizar la tutoría', 'error');
        console.error(error);
      });
    } else {
      this.tutoriasService.addTutoria({
        titulo: formData.titulo,
        cuerpo: formData.cuerpo,
        lugar: formData.lugar,
        horarios: formData.horarios
      }).then(() => {
        Swal.fire('Éxito', 'Tutoría creada correctamente', 'success');
        this.router.navigate(['/tutorias-feed']);
      }).catch(error => {
        Swal.fire('Error', 'No se pudo crear la tutoría', 'error');
        console.error(error);
      });
    }
  }

  editarTutoria(tutoria: any) {
    this.tutoriaForm.setValue({
      titulo: tutoria.titulo,
      cuerpo: tutoria.cuerpo,
      lugar: tutoria.lugar,
      horarios: tutoria.horarios,
      uuid: tutoria.uuid
    });
  }
}
