/*

import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos-feed',
  imports: [],
  templateUrl: './eventos-feed.html',
  styleUrl: './eventos-feed.scss'
})
export class EventosFeed {

}
*/

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Eventostgu } from '../../services/eventostgu';



@Component({
  selector: 'app-eventos-feed',
  imports: [CommonModule],
  templateUrl: './eventos-feed.html',
  styleUrl: './eventos-feed.scss'
})
export class EventosFeed implements OnInit {
  private eventosService = inject(Eventostgu);
  private router = inject(Router);

  eventos: any[] = [];
  eventosFiltrados: any[] = [];
  terminoBusqueda: string = '';
  cargando = true;

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.cargando = true;
    this.eventosService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.eventosFiltrados = [...this.eventos];
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);
        this.cargando = false;
        Swal.fire('Error', 'No se pudieron cargar los eventos', 'error');
      }
    });
  }

  

  buscarEventos(event: Event) {
    const termino = (event.target as HTMLInputElement).value.toLowerCase();
    this.terminoBusqueda = termino;

     if (!termino.trim()) {
    this.eventosFiltrados = [...this.eventos];
    return;
  }
  
    this.eventosFiltrados = this.eventos.filter(evento => 
      evento.titulo.toLowerCase().includes(termino) || 
      evento.brevedescripcion.toLowerCase().includes(termino) ||
      evento.lugar.toLowerCase().includes(termino)
    );
  }

  async eliminarEvento(uuid: string) {
    const result = await Swal.fire({
      title: '¿Eliminar evento?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#7f8c8d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
      try {
        await this.eventosService.deleteEvento(uuid);
        this.eventos = this.eventos.filter(e => e.uuid !== uuid);
        this.eventosFiltrados = this.eventosFiltrados.filter(e => e.uuid !== uuid);
        Swal.fire('Eliminado', 'El evento ha sido eliminado', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo eliminar el evento', 'error');
      }
    }
  }

  editarEvento(evento: any) {
    this.router.navigate(['/evento-form'], { state: { evento } });
  }

  nuevoEvento() {
    this.router.navigate(['/evento-form']);
  }

  formatFechaHoraCreacion(isoString: string) {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(isoString).toLocaleString('es-ES', options);
  }



  /*
  formatFechaHoraEvento(fecha: string, hora: string) {
    const [year, month, day] = fecha.split('-');
    const [hours, minutes] = hora.split(':');
    const fechaHora = new Date(Number(year), Number(month)-1, Number(day), Number(hours), Number(minutes));
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return fechaHora.toLocaleDateString('es-ES', options);
  }



 
  getDiaEvento(fechaString: string): string {
    const fecha = new Date(fechaString);
    return fecha.getDate().toString();
  }

  getMesEvento(fechaString: string): string {
    const fecha = new Date(fechaString);
    return fecha.toLocaleString('es-ES', { month: 'short' });
  }
*/

getDiaEvento(fechaString: string): string {
  // Crear fecha en UTC y ajustar a Honduras (UTC-6)
  const fecha = new Date(fechaString + 'T00:00:00-06:00');
  return fecha.getDate().toString();
}

getMesEvento(fechaString: string): string {
  // Crear fecha en UTC y ajustar a Honduras (UTC-6)
  const fecha = new Date(fechaString + 'T00:00:00-06:00');
  return fecha.toLocaleString('es-ES', { month: 'short', timeZone: 'America/Tegucigalpa' });
}

formatFechaHoraEvento(fecha: string, hora: string): string {
  // Combinar fecha y hora con la zona horaria de Honduras
  const fechaHora = new Date(`${fecha}T${hora}-06:00`);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Tegucigalpa'
  };
  
  return fechaHora.toLocaleString('es-HN', options);
}
  
  
} 

