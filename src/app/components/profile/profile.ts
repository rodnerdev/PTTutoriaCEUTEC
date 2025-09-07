/*

import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

}*/


import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from '../../services/autenticacion';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  private authService = inject(AutenticacionService);

  // Datos del usuario
  userData: any = null;
  loading = true;

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  private cargarDatosUsuario() {
    this.authService.currentUser$
      .subscribe({
        next: (user) => {
          this.userData = user;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading user data:', err);
          this.loading = false;
        }
      });
  }

  getNombreCompleto(): string {
    if (!this.userData) return 'Usuario';
    
    const partes = [
      this.userData.primerNombre,
      this.userData.segundoNombre, 
      this.userData.primerApellido,
      this.userData.segundoApellido
    ];
    
    return partes.filter(part => part && part.trim() !== '').join(' ');
  }

  // Verificar si un campo tiene valor
  tieneValor(campo: string): boolean {
    return this.userData && this.userData[campo] && this.userData[campo].toString().trim() !== '';
  }
}
