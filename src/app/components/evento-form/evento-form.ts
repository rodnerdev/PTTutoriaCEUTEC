
/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-evento-form',
  imports: [],
  templateUrl: './evento-form.html',
  styleUrl: './evento-form.scss'
})
export class EventoForm {

}
*/


import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Eventostgu } from '../../services/eventostgu';



@Component({
  selector: 'app-evento-form',
  imports: [ReactiveFormsModule,RouterLink, RouterOutlet],
  templateUrl: './evento-form.html',
  styleUrl: './evento-form.scss'
})
export class EventoForm {
  private eventosService = inject(Eventostgu);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  eventoForm: FormGroup;

  constructor() {
    this.eventoForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      brevedescripcion: ['', [Validators.required, Validators.maxLength(200)]],
      descripcion: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      uuid: [null]
    });

    // Cargar datos si estamos en modo edición
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['evento']) {
      this.editarEvento(state['evento']);
    }
  }

  guardarEvento() {
    if (this.eventoForm.invalid) {
      Swal.fire('Error', 'Por favor completa todos los campos requeridos', 'error');
      return;
    }

    const formData = this.eventoForm.value;

    if (formData.uuid) {
      this.eventosService.updateEvento({
        uuid: formData.uuid,
        titulo: formData.titulo,
        brevedescripcion: formData.brevedescripcion,
        descripcion: formData.descripcion,
        fecha: formData.fecha,
        hora: formData.hora,
        lugar: formData.lugar
      }).then(() => {
        Swal.fire('Éxito', 'Evento actualizado correctamente', 'success');
        this.router.navigate(['/eventos-feed']);
      }).catch(error => {
        Swal.fire('Error', 'No se pudo actualizar el evento', 'error');
        console.error(error);
      });
    } else {
      this.eventosService.addEvento({
        titulo: formData.titulo,
        brevedescripcion: formData.brevedescripcion,
        descripcion: formData.descripcion,
        fecha: formData.fecha,
        hora: formData.hora,
        lugar: formData.lugar
      }).then(() => {
        Swal.fire('Éxito', 'Evento creado correctamente', 'success');
        this.router.navigate(['/eventos-feed']);
      }).catch(error => {
        Swal.fire('Error', 'No se pudo crear el evento', 'error');
        console.error(error);
      });
    }
  }

  editarEvento(evento: any) {
    this.eventoForm.setValue({
      titulo: evento.titulo,
      brevedescripcion: evento.brevedescripcion,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      lugar: evento.lugar,
      uuid: evento.uuid
    });
  }
}