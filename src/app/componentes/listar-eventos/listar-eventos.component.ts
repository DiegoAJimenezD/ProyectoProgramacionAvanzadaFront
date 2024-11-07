import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-eventos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listar-eventos.component.html',
  styleUrl: './listar-eventos.component.css'
})
export class ListarEventosComponent {
  filas  = [0,1,2,3]

  constructor(private location: Location) {
  }
  
      // Método para regresar a la página anterior
      regresar() {
        this.location.back();
      }
}
