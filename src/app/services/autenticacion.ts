
/*
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Autenticacion {
  
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
