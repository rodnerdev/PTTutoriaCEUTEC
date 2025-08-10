/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-form',
  imports: [],
  templateUrl: './post-form.html',
  styleUrl: './post-form.scss'
})
export class PostForm {

}*/


import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Anunciostgu } from '../../services/anunciostgu';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink, RouterOutlet], // Importa ReactiveFormsModule
  templateUrl: './post-form.html',
  styleUrl: './post-form.scss'
})
export class PostForm {
  // Inyectamos el servicio y FormBuilder
  private anunciosService = inject(Anunciostgu);
  private formBuilder = inject(FormBuilder);

  // Definimos el formulario reactivo
  anuncioForm: FormGroup;

  constructor() {
    // Creamos el formulario con validaciones
    this.anuncioForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      cuerpo: ['', [Validators.required]],
      uuid: [null] // Para manejar la edición
    });
  }

  // Método para guardar el anuncio
  guardarAnuncio() {
    if (this.anuncioForm.invalid) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const formData = this.anuncioForm.value;

    if (formData.uuid) {
      // Si existe uuid, es una actualización
      this.anunciosService.updateAnuncio({
        uuid: formData.uuid,
        titulo: formData.titulo,
        cuerpo: formData.cuerpo
      });
    } else {
      // Si no existe uuid, es un nuevo anuncio
      this.anunciosService.addAnuncio({
        titulo: formData.titulo,
        cuerpo: formData.cuerpo
        // usuario y fechaHora se añaden automáticamente en el servicio
      });
    }

    this.anuncioForm.reset(); // Limpiamos el formulario
  }

  // Método para cargar datos en el formulario al editar
  editarAnuncio(anuncio: any) {
    this.anuncioForm.setValue({
      titulo: anuncio.titulo,
      cuerpo: anuncio.cuerpo,
      uuid: anuncio.uuid
    });
  }
}
