import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
authService = inject(AutenticacionService);
}
