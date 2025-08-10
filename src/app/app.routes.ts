import { Routes } from '@angular/router';
import { PostFeed } from './components/post-feed/post-feed';
import { TutoriasFeed } from './components/tutorias-feed/tutorias-feed';
import { Login } from './components/login/login';
import { PostForm } from './components/post-form/post-form';
import { Home } from './components/home/home';
import { PostFormEditar } from './components/post-form-editar/post-form-editar';
import { EventosFeed } from './components/eventos-feed/eventos-feed';



export const routes: Routes = [
   { path: '', component: Home},
    { path: 'post-feed', component: PostFeed},
  { path: 'tutorias-feed', component: TutoriasFeed},
   { path: 'login', component: Login},
   { path: 'post-form', component: PostForm},
    { path: 'home', component: Home},
     { path: 'post-form-editar', component: PostFormEditar},
     { path: 'eventos-feed', component: EventosFeed}


];

