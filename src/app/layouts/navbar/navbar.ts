import { Component } from '@angular/core';
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

}
