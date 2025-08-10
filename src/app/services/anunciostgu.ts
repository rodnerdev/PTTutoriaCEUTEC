
/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Anunciostgu {
  
}
*/



/*
import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
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

  // Crear anuncio (con usuario estático y fecha/hora)
  addAnuncio(anuncio: { titulo: string; cuerpo: string }) {
    const anunciosCollection = collection(this.firestore, 'anunciostgu');
    const anuncioCompleto = {
      ...anuncio,
      usuario: 'Rodner Antonio Zambrano Ordoñez', // Campo estático
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

  // Eliminar anuncio
  deleteAnuncio(uuid: string) {
    const anuncioDoc = doc(this.firestore, 'anunciostgu', uuid);
    return deleteDoc(anuncioDoc);
  }
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

  // Eliminar anuncio
  deleteAnuncio(uuid: string) {
    const anuncioDoc = doc(this.firestore, 'anunciostgu', uuid);
    return deleteDoc(anuncioDoc);
  }
}