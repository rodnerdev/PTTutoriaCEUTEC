import { Component } from '@angular/core';
import { PostForm } from '../post-form/post-form';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-post-feed',
  imports: [PostForm, RouterLink, RouterOutlet],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed {

}

