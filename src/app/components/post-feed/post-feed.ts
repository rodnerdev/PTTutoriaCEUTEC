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

