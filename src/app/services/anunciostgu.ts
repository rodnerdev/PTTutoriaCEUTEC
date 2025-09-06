

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
export class Anunciostgu {
  private firestore = inject(Firestore);
  authService = inject(AutenticacionService);

  // Obtener todos los anuncios
  getAnuncios() {
    const anunciosCollection = collection(this.firestore, 'anunciostgu');
    return collectionData(anunciosCollection, { idField: 'uuid' });
  }

  /*
  // Crear anuncio (con campos estáticos)
  addAnuncio(anuncio: { titulo: string; cuerpo: string }) {
    const anunciosCollection = collection(this.firestore, 'anunciostgu');
    const anuncioCompleto = {
      ...anuncio,
      nombre: 'Rodner Antonio Zambrano Ordoñez', // Campo nombre estático
      usuario: 'rodner777', // Campo usuario estático
       carrera: 'Informatica',
      fechaHora: new Date().toISOString(), // Fecha/hora actual
    };
    return addDoc(anunciosCollection, anuncioCompleto);
  }*/

async addAnuncio(anuncio: { titulo: string; cuerpo: string }) {
  // Obtener los datos actuales del usuario desde el servicio de autenticación
  const currentUser = this.authService.getCurrentUser();
  
  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }

  const anunciosCollection = collection(this.firestore, 'anunciostgu');
  
  const anuncioCompleto = {
    ...anuncio,
    // ✅ Datos dinámicos del usuario autenticado
    nombre: `${currentUser.primerNombre} ${currentUser.segundoNombre} ${currentUser.primerApellido} ${currentUser.segundoApellido}`,
    usuario: currentUser.email, // Usar el correo como usuario
    carrera: currentUser.carrera,
    universidad: currentUser.universidad,
    ciudad: currentUser.ciudad,
    uidUsuario: currentUser.uid, // Guardar también el UID del usuario
    fechaHora: new Date().toISOString(),
  };

  return addDoc(anunciosCollection, anuncioCompleto);
}


  // Actualizar anuncio (solo titulo y cuerpo)
  updateAnuncio(anuncio: { uuid: string; titulo: string; cuerpo: string }) {
    const anuncioDoc = doc(this.firestore, 'anunciostgu', anuncio.uuid);
    return updateDoc(anuncioDoc, {
      titulo: anuncio.titulo,
      cuerpo: anuncio.cuerpo,
    });
  }

  getAnuncioPorId(uuid: string) {
  const anuncioDoc = doc(this.firestore, 'anunciostgu', uuid);
  return docData(anuncioDoc); // Importa docData de '@angular/fire/firestore'
}

  // Eliminar anuncio
  deleteAnuncio(uuid: string) {
    const anuncioDoc = doc(this.firestore, 'anunciostgu', uuid);
    return deleteDoc(anuncioDoc);
  }
}