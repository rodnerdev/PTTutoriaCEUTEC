
/*

import { Component } from '@angular/core';

@Component({
  selector: 'app-post-form-editar',
  imports: [],
  templateUrl: './post-form-editar.html',
  styleUrl: './post-form-editar.scss'
})
export class PostFormEditar {

}
*/

import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Anunciostgu } from '../../services/anunciostgu';


@Component({
  selector: 'app-post-form-editar',
  templateUrl: './post-form-editar.html',
  styleUrls: ['./post-form-editar.scss'],
    imports: [ReactiveFormsModule], // Importa ReactiveFormsModule
})
export class PostFormEditar implements OnInit {
  private fb = inject(FormBuilder);
  private anunciosService = inject(Anunciostgu);

  @Input() uuid!: string; // Recibe el UUID del anuncio a editar
  editarForm: FormGroup;

  constructor() {
    this.editarForm = this.fb.group({
      titulo: ['', Validators.required],
      cuerpo: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  

  actualizarAnuncio() {
    if (this.editarForm.invalid) return;
    
    if (confirm('¿Estás seguro de guardar los cambios?')) {
      this.anunciosService.updateAnuncio({
        uuid: this.uuid,
        titulo: this.editarForm.value.titulo,
        cuerpo: this.editarForm.value.cuerpo
      }).then(() => {
        alert('✅ Anuncio actualizado correctamente');
        // Aquí puedes cerrar el formulario o recargar los datos
      }).catch(error => {
        console.error('Error al actualizar:', error);
        alert('❌ Error al actualizar el anuncio');
      });
    }
  }
}