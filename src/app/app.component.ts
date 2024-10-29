import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './componentes/shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoFinal';
  footer = 'Universidad del Quindío - 2024-2';
}

