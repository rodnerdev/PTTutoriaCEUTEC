/*

import { Component } from '@angular/core';

@Component({
  selector: 'app-tutorias-feed',
  imports: [],
  templateUrl: './tutorias-feed.html',
  styleUrl: './tutorias-feed.scss'
})
export class TutoriasFeed {

}
*/


import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Tutoriastgu } from '../../services/tutoriastgu';


@Component({
  selector: 'app-tutorias-feed',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './tutorias-feed.html',
  styleUrl: './tutorias-feed.scss'
})
export class TutoriasFeed implements OnInit {
  private tutoriasService = inject(Tutoriastgu);
  private router = inject(Router);

  tutorias: any[] = [];
  tutoriasFiltradas: any[] = [];
  terminoBusqueda: string = '';

  ngOnInit() {
    this.cargarTutorias();
  }

  cargarTutorias() {
    this.tutoriasService.getTutorias().subscribe((data) => {
      this.tutorias = data;
      this.tutoriasFiltradas = [...this.tutorias];
    });
  }

  buscarTutorias(event: Event) {
    const termino = (event.target as HTMLInputElement).value.toLowerCase();
    this.terminoBusqueda = termino;
    this.tutoriasFiltradas = this.tutorias.filter(tutoria => 
      tutoria.titulo.toLowerCase().includes(termino) || 
      tutoria.cuerpo.toLowerCase().includes(termino) ||
      tutoria.lugar.toLowerCase().includes(termino) ||
      tutoria.horarios.toLowerCase().includes(termino)
    );
  }

  eliminarTutoria(uuid: string) {
    if (confirm('¿Estás seguro de eliminar esta tutoría?')) {
      this.tutoriasService.deleteTutoria(uuid).then(() => {
        this.cargarTutorias();
      });
    }
  }

  editarTutoria(tutoria: any) {
    this.router.navigate(['/tutoria-form'], { state: { tutoria } });
  }

  formatDate(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}