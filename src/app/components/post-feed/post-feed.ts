

import { Component, inject } from '@angular/core';
import { PostForm } from '../post-form/post-form';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Anunciostgu } from '../../services/anunciostgu';
import { PostFormEditar } from '../post-form-editar/post-form-editar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-feed',
  imports: [PostForm, RouterLink, RouterOutlet, CommonModule, PostFormEditar],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed {

   anunciosService = inject(Anunciostgu);
  anuncios: any[] = []; // Aquí se almacenarán los anuncios
 editandoUuid: string | null = null; // Controla qué anuncio se está editando
  formData = { titulo: '', cuerpo: '' }; // Almacena los cambios temporales


   anunciosFiltrados: any[] = [];
  terminoBusqueda: string = '';
   constructor() {
    this.cargarAnuncios();
  }

  cargarAnuncios() {
    this.anunciosService.getAnuncios().subscribe((data) => {
      this.anuncios = data;
      this.anunciosFiltrados = [...this.anuncios];
    });
  }

  // Función para eliminar con confirmación
  eliminarAnuncio(uuid: string) {
    if (confirm('¿Estás seguro de eliminar este anuncio?')) {
      this.anunciosService.deleteAnuncio(uuid).then(() => {
        this.cargarAnuncios(); // Recargar la lista después de eliminar
      });
    }
  }
  
  // Prepara los datos para edición
  prepararEdicion(anuncio: any) {
    this.editandoUuid = anuncio.uuid;
    this.formData = {
      titulo: anuncio.titulo,
      cuerpo: anuncio.cuerpo
    };
  }

  // Guarda los cambios directamente
  guardarCambios() {
    if (confirm('¿Guardar cambios?')) {
      this.anunciosService.updateAnuncio({
        uuid: this.editandoUuid!,
        titulo: this.formData.titulo,
        cuerpo: this.formData.cuerpo
      }).then(() => {
      
        this.cargarAnuncios();
      });
    }
  }

buscarAnuncios(event: Event) {
  const termino = (event.target as HTMLInputElement).value.toLowerCase();
  this.terminoBusqueda = termino;

  if (!termino.trim()) {
    this.anunciosFiltrados = [...this.anuncios];
    return;
  }
  
  this.anunciosFiltrados = this.anuncios.filter(anuncio => 
    anuncio.titulo.toLowerCase().includes(termino) || 
    anuncio.cuerpo.toLowerCase().includes(termino) ||
    (anuncio.nombre && anuncio.nombre.toLowerCase().includes(termino)) ||
    (anuncio.usuario && anuncio.usuario.toLowerCase().includes(termino)) ||
    (anuncio.carrera && anuncio.carrera.toLowerCase().includes(termino))
  );
}
  

  // Método para formatear la fecha (opcional)
  formatDate(isoString: string) {
    return new Date(isoString).toLocaleString();
  }

 async editarAnuncio(anuncio: any) {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Anuncio',
      html:
        `<input id="titulo" class="swal2-input" value="${anuncio.titulo}">` +
        `<textarea id="cuerpo" class="swal2-textarea">${anuncio.cuerpo}</textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          titulo: (document.getElementById('titulo') as HTMLInputElement).value,
          cuerpo: (document.getElementById('cuerpo') as HTMLTextAreaElement).value
        };
      }
    });

    if (formValues) {
      try {
        await this.anunciosService.updateAnuncio({
          uuid: anuncio.uuid,
          titulo: formValues.titulo,
          cuerpo: formValues.cuerpo
        });
        Swal.fire('¡Actualizado!', 'El anuncio se editó correctamente', 'success');
        this.cargarAnuncios();
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el anuncio', 'error');
      }
    }
  }


}

