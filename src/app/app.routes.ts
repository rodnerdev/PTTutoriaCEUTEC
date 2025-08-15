import { Routes } from '@angular/router';
import { PostFeed } from './components/post-feed/post-feed';
import { TutoriasFeed } from './components/tutorias-feed/tutorias-feed';
import { Login } from './components/login/login';
import { PostForm } from './components/post-form/post-form';
import { Home } from './components/home/home';
import { PostFormEditar } from './components/post-form-editar/post-form-editar';
import { EventosFeed } from './components/eventos-feed/eventos-feed';
import { TutoriaFormComponent } from './components/tutoria-form/tutoria-form';
import { EventoForm } from './components/evento-form/evento-form';
import { Navbar } from './layouts/navbar/navbar';



/*
export const routes: Routes = [
   { path: '', component: Login},
    { path: 'post-feed', component: PostFeed},
  { path: 'tutorias-feed', component: TutoriasFeed},
   { path: 'login', component: Login},
   { path: 'post-form', component: PostForm},
    { path: 'home', component: Home},
     { path: 'post-form-editar', component: PostFormEditar},
     { path: 'eventos-feed', component: EventosFeed},
     { path: 'tutoria-form', component: TutoriaFormComponent},
     { path: 'evento-form', component: EventoForm}



];
*/


export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { 
    path: '', 
    component: Navbar, // Este incluye el navbar
    children: [
      { path: 'post-feed', component: PostFeed },
      { path: 'tutorias-feed', component: TutoriasFeed },
      { path: 'post-form', component: PostForm },
      { path: 'home', component: Home },
      { path: 'post-form-editar', component: PostFormEditar },
      { path: 'eventos-feed', component: EventosFeed },
      { path: 'tutoria-form', component: TutoriaFormComponent },
      { path: 'evento-form', component: EventoForm }
    ]
  }
];
