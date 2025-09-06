
/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Eventostgu {
  
}
*/



import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  docData,
} from '@angular/fire/firestore';
import { AutenticacionService } from './autenticacion';

@Injectable({
  providedIn: 'root',
})
export class Eventostgu {
  private firestore = inject(Firestore);
  authService = inject(AutenticacionService);

  // Obtener todos los eventos
  getEventos() {
    const eventosCollection = collection(this.firestore, 'eventostgu');
    return collectionData(eventosCollection, { idField: 'uuid' });
  }

  /*
  // Crear evento con campos actualizados
  addEvento(evento: { 
    titulo: string;
    brevedescripcion: string;
    descripcion: string;
    fecha: string;
    hora: string;
    lugar: string 
  }) {
    const eventosCollection = collection(this.firestore, 'eventostgu');
    const eventoCompleto = {
      ...evento,
      CreadorNombre: 'Rodner Antonio Zambrano Ordoñez',
      Creadorusuario: 'rodner777',
      carrera: 'Informatica',
      fechaHoraCreacion: new Date().toISOString(),
    };
    return addDoc(eventosCollection, eventoCompleto);
  }*/

async addEvento(evento: { 
  titulo: string;
  brevedescripcion: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
}) {
  // Obtener los datos actuales del usuario desde el servicio de autenticación
  const currentUser = this.authService.getCurrentUser();
  
  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }

  const eventosCollection = collection(this.firestore, 'eventostgu');
  
  const eventoCompleto = {
    ...evento,
    // ✅ Datos dinámicos del usuario autenticado
    Creadornombre: `${currentUser.primerNombre} ${currentUser.segundoNombre} ${currentUser.primerApellido} ${currentUser.segundoApellido}`,
    Creadorusuario: currentUser.email, // Usar el correo como usuario
    carrera: currentUser.carrera,
    universidad: currentUser.universidad,
    ciudad: currentUser.ciudad,
    uidCreador: currentUser.uid, // Guardar también el UID del usuario
    fechaHoraCreacion: new Date().toISOString(),
  };

  return addDoc(eventosCollection, eventoCompleto);
}


  // Actualizar evento
  updateEvento(evento: { 
    uuid: string;
    titulo: string;
    brevedescripcion: string;
    descripcion: string;
    fecha: string;
    hora: string;
    lugar: string
  }) {
    const eventoDoc = doc(this.firestore, 'eventostgu', evento.uuid);
    return updateDoc(eventoDoc, {
      titulo: evento.titulo,
      brevedescripcion: evento.brevedescripcion,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      lugar: evento.lugar
    });
  }

  // Obtener evento por ID
  getEventoPorId(uuid: string) {
    const eventoDoc = doc(this.firestore, 'eventostgu', uuid);
    return docData(eventoDoc);
  }

  // Eliminar evento
  deleteEvento(uuid: string) {
    const eventoDoc = doc(this.firestore, 'eventostgu', uuid);
    return deleteDoc(eventoDoc);
  }
}
