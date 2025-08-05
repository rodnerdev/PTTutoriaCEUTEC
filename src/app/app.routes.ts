import { Routes } from '@angular/router';
import { TutoriasFeed } from './tutorias-feed/tutorias-feed';
import { PostFeed } from './post-feed/post-feed';

export const routes: Routes = [
    { path: 'post-feed', component: PostFeed},
  { path: 'tutorias-feed', component: TutoriasFeed}
];
