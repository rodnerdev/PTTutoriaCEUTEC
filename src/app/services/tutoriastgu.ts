
/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Tutoriastgu {
  
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
export class Tutoriastgu {
  private firestore = inject(Firestore);
  authService = inject(AutenticacionService);

  getTutorias() {
    const tutoriasCollection = collection(this.firestore, 'tutoriastgu');
    return collectionData(tutoriasCollection, { idField: 'uuid' });
  }

  /*

  addTutoria(tutoria: { titulo: string; cuerpo: string; lugar: string; horarios: string }) {
    const tutoriasCollection = collection(this.firestore, 'tutoriastgu');
    const tutoriaCompleta = {
      ...tutoria,
      nombre: 'Rodner Antonio Zambrano Ordoñez',
      usuario: 'rodner777',
      carrera: 'Ingenieria en Informatica',
      fechaHora: new Date().toISOString(),
    };
    return addDoc(tutoriasCollection, tutoriaCompleta);
  }

  */


async addTutoria(tutoria: { titulo: string; cuerpo: string; lugar: string; horarios: string }) {
  // Obtener los datos actuales del usuario desde el servicio de autenticación
  const currentUser = this.authService.getCurrentUser();
  
  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }

  const tutoriasCollection = collection(this.firestore, 'tutoriastgu');
  
  const tutoriaCompleta = {
    ...tutoria,
    // ✅ Datos dinámicos del usuario autenticado
    nombre: `${currentUser.primerNombre} ${currentUser.segundoNombre} ${currentUser.primerApellido} ${currentUser.segundoApellido}`,
    usuario: currentUser.email, // Usar el correo como usuario
    carrera: currentUser.carrera,
    universidad: currentUser.universidad,
    ciudad: currentUser.ciudad,
    uidUsuario: currentUser.uid, // Guardar también el UID del usuario
    fechaHora: new Date().toISOString(),
  };

  return addDoc(tutoriasCollection, tutoriaCompleta);
}


  updateTutoria(tutoria: { 
    uuid: string; 
    titulo: string; 
    cuerpo: string;
    lugar: string;
    horarios: string 
  }) {
    const tutoriaDoc = doc(this.firestore, 'tutoriastgu', tutoria.uuid);
    return updateDoc(tutoriaDoc, {
      titulo: tutoria.titulo,
      cuerpo: tutoria.cuerpo,
      lugar: tutoria.lugar,
      horarios: tutoria.horarios
    });
  }

  getTutoriaPorId(uuid: string) {
    const tutoriaDoc = doc(this.firestore, 'tutoriastgu', uuid);
    return docData(tutoriaDoc);
  }

  deleteTutoria(uuid: string) {
    const tutoriaDoc = doc(this.firestore, 'tutoriastgu', uuid);
    return deleteDoc(tutoriaDoc);
  }
}