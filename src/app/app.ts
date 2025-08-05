import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { PostFeed } from './post-feed/post-feed';
import { TutoriasFeed } from './tutorias-feed/tutorias-feed';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, PostFeed, TutoriasFeed],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PTTutoriaCEUTEC');
}
