import { Component } from '@angular/core';
import { PostFeed } from '../../post-feed/post-feed';
import { TutoriasFeed } from '../../tutorias-feed/tutorias-feed';

@Component({
  selector: 'app-navbar',
  imports: [Navbar, PostFeed, TutoriasFeed],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
