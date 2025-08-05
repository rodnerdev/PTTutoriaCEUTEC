import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostFeed } from './components/post-feed/post-feed';
import { TutoriasFeed } from './components/tutorias-feed/tutorias-feed';
import { Login } from './components/login/login';
import { PostForm } from './components/post-form/post-form';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink ,PostFeed, TutoriasFeed, Login, PostForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PTTutoriaCEUTEC');
}
