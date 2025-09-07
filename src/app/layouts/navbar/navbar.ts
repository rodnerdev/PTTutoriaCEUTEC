import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Home } from '../../components/home/home';
import { PostFeed } from '../../components/post-feed/post-feed';
import { TutoriasFeed } from '../../components/tutorias-feed/tutorias-feed';
import { Login } from '../../components/login/login';
import { PostForm } from '../../components/post-form/post-form';
import { PostFormEditar } from '../../components/post-form-editar/post-form-editar';
import { EventosFeed } from '../../components/eventos-feed/eventos-feed';
import { TutoriaFormComponent } from '../../components/tutoria-form/tutoria-form';
import { AutenticacionService } from '../../services/autenticacion';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet,Home, RouterLink ,PostFeed, TutoriasFeed, Login, PostForm, PostFormEditar, EventosFeed,TutoriaFormComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

isMenuOpen = false;


 isDropdownOpen = false;

  // Agrega este método (junto con los que ya tienes)
  handleDropdownClick(event: Event): void {
    // Solo manejar clics en móvil
    if (window.innerWidth < 768) {
      event.preventDefault();
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  // Modifica tu método onNavLinkClick existente para que quede así:
  

  // Agrega este HostListener (junto con los que ya tienes)
  @HostListener('window:resize')
  onResize(): void {
    // Cierra el dropdown al cambiar a vista desktop
    if (window.innerWidth >= 768) {
      this.isDropdownOpen = false;
    }
  }



  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // Cierra el menú al hacer clic en un enlace (útil para SPA)
  onNavLinkClick(): void {
    this.closeMenu();
    this.isDropdownOpen = false;
  }

  // Opcional: Cierra el menú al hacer clic fuera o al scrollear
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar-container') && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }



  
  // ✅ Variables para control de acceso
  userRol: string | null = null;
  isAdmin: boolean = false;
  isReadOnly: boolean = true;
  
  private destroy$ = new Subject<void>();
    
  
  
  async ngOnInit() {
      // Primero suscribirse al usuario actual de auth
      this.authService.currentUser$
          .pipe(takeUntil(this.destroy$))
          .subscribe(async (user: any) => {
              if (user) {
                  // Obtener los datos COMPLETOS del usuario desde Firestore
                  const userData = await this.authService.getUsuarioConRol(user.uid);
                  
                  if (userData) {
                      this.userRol = userData.rol || null;
                      this.isAdmin = this.userRol === 'Administrador';
                      this.isReadOnly = !this.isAdmin;
                      
                      console.log('Datos completos usuario:', userData);
                      console.log('Rol:', this.userRol);
                      console.log('Es admin:', this.isAdmin);
                  }
              } else {
                  this.userRol = null;
                  this.isAdmin = false;
                  this.isReadOnly = true;
              }
          });
  }






  private authService = inject(AutenticacionService); // ← Usando el nombre correcto
  private router = inject(Router);
  
  loading = false;

  cerrarSesion() {
    // Mostrar diálogo de confirmación
    const confirmacion = confirm('¿Estás seguro de que quieres cerrar sesión?');
    
    // Si el usuario cancela, no hacer nada
    if (!confirmacion) {
      console.log('Cierre de sesión cancelado por el usuario');
      return;
    }

    // Si confirma, proceder con el cierre de sesión
    this.loading = true;
    
    this.authService
      .cerrarSesion()
      .then(() => {
        // Redirigir al login después de cerrar sesión
        this.router.navigate(['/login']);
        alert('Sesión cerrada exitosamente');
      })
      .catch((error) => {
        alert('Error al cerrar sesión: ' + error.message);
      })
      .finally(() => {
        this.loading = false;
      });
  }



}
