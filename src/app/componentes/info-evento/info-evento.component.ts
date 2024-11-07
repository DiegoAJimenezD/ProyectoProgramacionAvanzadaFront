import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-evento',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './info-evento.component.html',
  styleUrl: './info-evento.component.css'
})
export class InfoEventoComponent {

  constructor(private location: Location) {

  }

    // Método para regresar a la página anterior
    regresar() {
      this.location.back();
    }
}
