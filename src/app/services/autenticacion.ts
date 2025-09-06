
/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Autenticacion {
  
}
*/



//autenticacion bueno
/*

import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from '@angular/fire/auth';
import {
  doc,
  Firestore,
  setDoc
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserData {
  email: string;
  uid: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  public authState$ = authState(this.auth);
  public loading = false;

  constructor() {
    this.authState$.subscribe(async (user) => {
      if (user) {
        const userData: UserData = {
          email: user.email!,
          uid: user.uid,
          emailVerified: user.emailVerified
        };
        this.currentUserSubject.next(userData);
        await this.guardarUsuarioEnFirestore(userData);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  private async guardarUsuarioEnFirestore(user: UserData): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        email: user.email,
        uid: user.uid,
        emailVerified: user.emailVerified,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error guardando usuario en Firestore:', error);
    }
  }

  async registrarUsuario(email: string, password: string): Promise<UserCredential> {
    this.loading = true;
    try {
      const credencial = await createUserWithEmailAndPassword(this.auth, email, password);
      
      if (credencial.user && !credencial.user.emailVerified) {
         alert('Por favor verifica tu correo');
        await sendEmailVerification(credencial.user);
      }

      return credencial;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async iniciarSesion(email: string, password: string): Promise<UserCredential> {
    this.loading = true;
    try {
      const credencial = await signInWithEmailAndPassword(this.auth, email, password);
      
      if (credencial.user && !credencial.user.emailVerified) {
        await sendEmailVerification(credencial.user);
      }

      return credencial;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async cerrarSesion(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      throw error;
    }
  }

  getCurrentUser(): UserData | null {
    return this.currentUserSubject.value;
  }
}
*/


import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from '@angular/fire/auth';
import {
  doc,
  Firestore,
  setDoc,
  getDoc
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserData {
  email: string;
  uid: string;
  emailVerified: boolean;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  universidad: 'UNITEC' | 'CEUTEC';
  ciudad: 'Tegucigalpa' | 'San Pedro Sula' | 'La Ceiba';
  carrera: string;
  rol: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  public authState$ = authState(this.auth);
  public loading = false;

  constructor() {
    this.authState$.subscribe(async (user) => {
      if (user) {
        const userData = await this.cargarDatosUsuarioDesdeFirestore(user.uid);
        this.currentUserSubject.next(userData);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  private async cargarDatosUsuarioDesdeFirestore(uid: string): Promise<UserData> {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userSnapshot = await getDoc(userDocRef);
      
      if (userSnapshot.exists()) {
        return userSnapshot.data() as UserData;
      } else {
        // Si no existe en Firestore, crear datos básicos
        const user = this.auth.currentUser;
        return {
          email: user?.email || '',
          uid: uid,
          emailVerified: user?.emailVerified || false,
          primerNombre: '',
          segundoNombre: '',
          primerApellido: '',
          segundoApellido: '',
          universidad: 'UNITEC',
          ciudad: 'Tegucigalpa',
          carrera: '',
          rol: '',
          createdAt: new Date()
        };
      }
    } catch (error) {
      console.error('Error cargando datos de usuario:', error);
      throw error;
    }
  }

  private async guardarUsuarioEnFirestore(user: UserData): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        email: user.email,
        uid: user.uid,
        emailVerified: user.emailVerified,
        primerNombre: user.primerNombre,
        segundoNombre: user.segundoNombre || '',
        primerApellido: user.primerApellido,
        segundoApellido: user.segundoApellido || '',
        universidad: user.universidad,
        ciudad: user.ciudad,
        carrera: user.carrera,
        rol: user.rol,
        createdAt: user.createdAt
      });
    } catch (error) {
      console.error('Error guardando usuario en Firestore:', error);
      throw error;
    }
  }

  async registrarUsuario(
    email: string, 
    password: string, 
    userData: Omit<UserData, 'uid' | 'email' | 'emailVerified' | 'createdAt'>
  ): Promise<UserCredential> {
    this.loading = true;
    try {
      const credencial = await createUserWithEmailAndPassword(this.auth, email, password);
      
      const userCompleteData: UserData = {
        email: email,
        uid: credencial.user.uid,
        emailVerified: credencial.user.emailVerified,
        createdAt: new Date(),
        ...userData
      };
      
      await this.guardarUsuarioEnFirestore(userCompleteData);
      
      if (credencial.user && !credencial.user.emailVerified) {
        alert('Por favor verifica tu correo');
        await sendEmailVerification(credencial.user);
      }

      return credencial;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async iniciarSesion(email: string, password: string): Promise<UserCredential> {
    this.loading = true;
    try {
      const credencial = await signInWithEmailAndPassword(this.auth, email, password);
      
      if (credencial.user && !credencial.user.emailVerified) {
        await sendEmailVerification(credencial.user);
      }

      return credencial;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async cerrarSesion(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      throw error;
    }
  }

  getCurrentUser(): UserData | null {
    return this.currentUserSubject.value;
  }

  // Getters para datos globales
  get currentUserUUID(): string | null {
    return this.currentUserSubject.value?.uid || null;
  }

  get currentUserUniversidad(): string | null {
    return this.currentUserSubject.value?.universidad || null;
  }

  get currentUserCiudad(): string | null {
    return this.currentUserSubject.value?.ciudad || null;
  }

  get currentUserRol(): string | null {
    return this.currentUserSubject.value?.rol || null;
  }

  get currentUserNombreCompleto(): string | null {
    const user = this.currentUserSubject.value;
    if (!user) return null;
    
    return `${user.primerNombre} ${user.segundoNombre ? user.segundoNombre + ' ' : ''}${user.primerApellido}${user.segundoApellido ? ' ' + user.segundoApellido : ''}`;
  }
}