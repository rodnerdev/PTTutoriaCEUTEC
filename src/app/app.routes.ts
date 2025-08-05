import { Routes } from '@angular/router';
import { PostFeed } from './components/post-feed/post-feed';
import { TutoriasFeed } from './components/tutorias-feed/tutorias-feed';
import { Login } from './components/login/login';
import { PostForm } from './components/post-form/post-form';



export const routes: Routes = [
   { path: '', component: PostFeed},
    { path: 'post-feed', component: PostFeed},
  { path: 'tutorias-feed', component: TutoriasFeed},
   { path: 'login', component: Login},
   { path: 'post-form', component: PostForm}

];

