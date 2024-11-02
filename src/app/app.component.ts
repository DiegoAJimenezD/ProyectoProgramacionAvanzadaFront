import { Component } from '@angular/core';
import { HeaderComponent } from './componentes/shared/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './componentes/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,RouterModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoFinal';
  footer = 'Universidad del Quindío - 2024-2';
}

