import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Home } from '../../components/home/home';
import { PostFeed } from '../../components/post-feed/post-feed';
import { TutoriasFeed } from '../../components/tutorias-feed/tutorias-feed';
import { Login } from '../../components/login/login';
import { PostForm } from '../../components/post-form/post-form';
import { PostFormEditar } from '../../components/post-form-editar/post-form-editar';
import { EventosFeed } from '../../components/eventos-feed/eventos-feed';
import { TutoriaFormComponent } from '../../components/tutoria-form/tutoria-form';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet,Home, RouterLink ,PostFeed, TutoriasFeed, Login, PostForm, PostFormEditar, EventosFeed,TutoriaFormComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // Cierra el menú al hacer clic en un enlace (útil para SPA)
  onNavLinkClick(): void {
    this.closeMenu();
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



}
