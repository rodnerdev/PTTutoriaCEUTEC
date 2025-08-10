/*
import { Component } from '@angular/core';
import { PostForm } from '../post-form/post-form';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-post-feed',
  imports: [PostForm, RouterLink, RouterOutlet],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed {

}*/




/*


import { Component, inject } from '@angular/core';
import { PostForm } from '../post-form/post-form';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Anunciostgu } from '../../services/anunciostgu';

@Component({
  selector: 'app-post-feed',
  imports: [PostForm, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed {

   anunciosService = inject(Anunciostgu);
  anuncios: any[] = []; // Aquí se almacenarán los anuncios

  constructor() {
    // Cargar anuncios al iniciar
    this.anunciosService.getAnuncios().subscribe((data) => {
      this.anuncios = data;
    });
  }

  // Método para formatear la fecha (opcional)
  formatDate(isoString: string) {
    return new Date(isoString).toLocaleString();
  }
}

*/





//bueno backup

/*

import { Component, inject } from '@angular/core';
import { PostForm } from '../post-form/post-form';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Anunciostgu } from '../../services/anunciostgu';
import { PostFormEditar } from '../post-form-editar/post-form-editar';

@Component({
  selector: 'app-post-feed',
  imports: [PostForm, RouterLink, RouterOutlet, CommonModule, PostFormEditar],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed {

   anunciosService = inject(Anunciostgu);
  anuncios: any[] = []; // Aquí se almacenarán los anuncios

   constructor() {
    this.cargarAnuncios();
  }

  cargarAnuncios() {
    this.anunciosService.getAnuncios().subscribe((data) => {
      this.anuncios = data;
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
  

  // Método para formatear la fecha (opcional)
  formatDate(isoString: string) {
    return new Date(isoString).toLocaleString();
  }
}


*/



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

   constructor() {
    this.cargarAnuncios();
  }

  cargarAnuncios() {
    this.anunciosService.getAnuncios().subscribe((data) => {
      this.anuncios = data;
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

