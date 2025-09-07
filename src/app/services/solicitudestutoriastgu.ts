/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Solicitudestutoriastgu {
  
}*/


import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AutenticacionService } from './autenticacion';


export interface SolicitudTutoria {
  clase: string;
  temas: string;
  demasAlumnos?: string;
  nombreSolicitante: string;
  emailSolicitante: string;
  universidadSolicitante: string;
  ciudadSolicitante: string;
  carreraSolicitante: string;
  uidSolicitante: string;
  fechaSolicitud: string;
  estado: 'pendiente' | 'aceptada' | 'rechazada';
}

@Injectable({
  providedIn: 'root'
})
export class Solicitudestutoriastgu {

  private firestore = inject(Firestore);
  private authService = inject(AutenticacionService);

  async crearSolicitud(solicitud: { 
    clase: string; 
    temas: string; 
    demasAlumnos?: string 
  }) {
    // Obtener datos del usuario actual
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const solicitudesCollection = collection(this.firestore, 'solicitudestutoriastgu');
    
    const solicitudCompleta: SolicitudTutoria = {
      ...solicitud,
      nombreSolicitante: `${currentUser.primerNombre} ${currentUser.primerApellido}`,
      emailSolicitante: currentUser.email,
      universidadSolicitante: currentUser.universidad,
      ciudadSolicitante: currentUser.ciudad,
      carreraSolicitante: currentUser.carrera,
      uidSolicitante: currentUser.uid,
      fechaSolicitud: new Date().toISOString(),
      estado: 'pendiente'
    };

    return addDoc(solicitudesCollection, solicitudCompleta);
  }
}
