import { Component } from '@angular/core';
import { HeaderComponent } from './componentes/shared/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoFinal';
  footer = 'Universidad del Quindío - 2024-2';
}

