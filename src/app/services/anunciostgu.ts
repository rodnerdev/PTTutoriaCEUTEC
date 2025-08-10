

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

@Injectable({
  providedIn: 'root',
})
export class Anunciostgu {
  private firestore = inject(Firestore);

  // Obtener todos los anuncios
  getAnuncios() {
    const anunciosCollection = collection(this.firestore, 'anunciostgu');
    return collectionData(anunciosCollection, { idField: 'uuid' });
  }

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