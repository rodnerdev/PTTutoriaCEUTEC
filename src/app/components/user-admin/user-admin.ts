/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-admin',
  imports: [],
  templateUrl: './user-admin.html',
  styleUrl: './user-admin.scss'
})
export class UserAdmin {

}*/


/*

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AutenticacionService } from '../../services/autenticacion';
import { RouterLink } from '@angular/router';

interface User {
  uid: string;
  email: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  universidad: string;
  ciudad: string;
  carrera: string;
  rol: string;
  emailVerified: boolean;
  createdAt: any;
}

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './user-admin.html',
  styleUrl: './user-admin.scss'
})
export class  UserAdmin implements OnInit, OnDestroy {

  private firestore = inject(Firestore);

  users: User[] = [];
  loading = true;
  editingUser: User | null = null;
  editedUser: any = {};
  private usersSubscription: any;
authService = inject(AutenticacionService);
  // Opciones para los selects de edición
  roles = ['Estudiante', 'Profesor', 'Administrador'];
  universidades = ['UNITEC', 'CEUTEC'];
  ciudades = ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba'];

  ngOnInit() {
    this.cargarUsuarios();
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  cargarUsuarios() {
    const usersCollection = collection(this.firestore, 'users');
    
    this.usersSubscription = collectionData(usersCollection, { idField: 'uid' })
      .subscribe({
        next: (data: any[]) => {
          this.users = data as User[];
          this.loading = false;
          console.log('Usuarios cargados:', this.users);
        },
        error: (error) => {
          console.error('Error cargando usuarios:', error);
          this.loading = false;
          Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
        }
      });
  }

  editarUsuario(user: User) {
    this.editingUser = user;
    this.editedUser = { ...user }; // Copia para editar
  }

  cancelarEdicion() {
    this.editingUser = null;
    this.editedUser = {};
  }

  async guardarCambios() {
    if (!this.editingUser) return;

    try {
      const userDocRef = doc(this.firestore, `users/${this.editingUser.uid}`);
      
      await updateDoc(userDocRef, {
        primerNombre: this.editedUser.primerNombre,
        segundoNombre: this.editedUser.segundoNombre || '',
        primerApellido: this.editedUser.primerApellido,
        segundoApellido: this.editedUser.segundoApellido || '',
        universidad: this.editedUser.universidad,
        ciudad: this.editedUser.ciudad,
        carrera: this.editedUser.carrera,
        rol: this.editedUser.rol
      });

      Swal.fire('¡Actualizado!', 'Usuario actualizado correctamente', 'success');
      this.cancelarEdicion();
      
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
    }
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return 'N/A';
    
    try {
      const date = fecha.toDate ? fecha.toDate() : new Date(fecha);
      return date.toLocaleDateString('es-HN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  }

  getNombreCompleto(user: User): string {
    return `${user.primerNombre || ''} ${user.segundoNombre || ''} ${user.primerApellido || ''} ${user.segundoApellido || ''}`.trim();
  }
}

*/



import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AutenticacionService } from '../../services/autenticacion';
import { RouterLink } from '@angular/router';

interface User {
  uid: string;
  email: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  universidad: string;
  ciudad: string;
  carrera: string;
  rol: string;
  emailVerified: boolean;
  createdAt: any;
  modificadoPor?: { // ✅ Nuevo campo
    uuid: string;
    nombre: string;
    fecha: Date;
  };
}

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-admin.html',
  styleUrl: './user-admin.scss'
})
export class UserAdmin implements OnInit, OnDestroy {

  private firestore = inject(Firestore);
  authService = inject(AutenticacionService);

  users: User[] = [];
  loading = true;
  editingUser: User | null = null;
  editedUser: any = {};
  private usersSubscription: any;

  // Opciones para los selects de edición
  roles = ['Estudiante', 'Profesor', 'Administrador'];
  universidades = ['UNITEC', 'CEUTEC'];
  ciudades = ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba'];

  ngOnInit() {
    this.cargarUsuarios();
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  cargarUsuarios() {
    const usersCollection = collection(this.firestore, 'users');
    
    this.usersSubscription = collectionData(usersCollection, { idField: 'uid' })
      .subscribe({
        next: (data: any[]) => {
          this.users = data as User[];
          this.loading = false;
          console.log('Usuarios cargados:', this.users);
        },
        error: (error) => {
          console.error('Error cargando usuarios:', error);
          this.loading = false;
          Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
        }
      });
  }

  editarUsuario(user: User) {
    this.editingUser = user;
    this.editedUser = { ...user }; // Copia para editar
  }

  cancelarEdicion() {
    this.editingUser = null;
    this.editedUser = {};
  }


/*
  async guardarCambios() {
    if (!this.editingUser) return;

    try {
      // ✅ Obtener información del usuario actual que está editando
      const currentUser = this.authService.getCurrentUser();
      
      if (!currentUser) {
        throw new Error('Usuario no autenticado');
      }

      const userDocRef = doc(this.firestore, `users/${this.editingUser.uid}`);
      
      // ✅ Datos a actualizar incluyendo el campo modificadoPor
      const updateData = {
        primerNombre: this.editedUser.primerNombre,
        segundoNombre: this.editedUser.segundoNombre || '',
        primerApellido: this.editedUser.primerApellido,
        segundoApellido: this.editedUser.segundoApellido || '',
        universidad: this.editedUser.universidad,
        ciudad: this.editedUser.ciudad,
        carrera: this.editedUser.carrera,
        rol: this.editedUser.rol,
        modificadoPor: { // ✅ Nuevo campo de auditoría
          uuid: currentUser.uid,
          nombre: this.getNombreCompleto(currentUser),
          fecha: new Date(),
          email: currentUser.email
        }
      };

      await updateDoc(userDocRef, updateData);

      Swal.fire('¡Actualizado!', 'Usuario actualizado correctamente', 'success');
      this.cancelarEdicion();
      
      // ✅ Recargar los datos para ver los cambios
      this.cargarUsuarios();
      
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
    }
  }
  */


async guardarCambios() {
  if (!this.editingUser) return;

  // Agregar confirmación sencilla
  const confirmacion = confirm('¿Está seguro que desea modificar este usuario?');
  
  // Si el usuario cancela, no hacer nada
  if (!confirmacion) {
    return;
  }

  try {
    // ✅ Obtener información del usuario actual que está editando
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const userDocRef = doc(this.firestore, `users/${this.editingUser.uid}`);
    
    // ✅ Datos a actualizar incluyendo el campo modificadoPor
    const updateData = {
      primerNombre: this.editedUser.primerNombre,
      segundoNombre: this.editedUser.segundoNombre || '',
      primerApellido: this.editedUser.primerApellido,
      segundoApellido: this.editedUser.segundoApellido || '',
      universidad: this.editedUser.universidad,
      ciudad: this.editedUser.ciudad,
      carrera: this.editedUser.carrera,
      rol: this.editedUser.rol,
      modificadoPor: { // ✅ Nuevo campo de auditoría
        uuid: currentUser.uid,
        nombre: this.getNombreCompleto(currentUser),
        fecha: new Date(),
        email: currentUser.email
      }
    };

    await updateDoc(userDocRef, updateData);

    Swal.fire('¡Actualizado!', 'Usuario actualizado correctamente', 'success');
    this.cancelarEdicion();
    
    // ✅ Recargar los datos para ver los cambios
    this.cargarUsuarios();
    
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
  }
}


  formatearFecha(fecha: any): string {
    if (!fecha) return 'N/A';
    
    try {
      const date = fecha.toDate ? fecha.toDate() : new Date(fecha);
      return date.toLocaleDateString('es-HN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  }

  getNombreCompleto(user: any): string {
    return `${user.primerNombre || ''} ${user.segundoNombre || ''} ${user.primerApellido || ''} ${user.segundoApellido || ''}`.trim();
  }

  // ✅ Método para obtener información de quién modificó
  getModificadoPorInfo(user: User): string {
    if (!user.modificadoPor) return 'Nunca modificado';
    
    return `Modificado por: ${user.modificadoPor.nombre} 
            (${this.formatearFecha(user.modificadoPor.fecha)})`;
  }
}