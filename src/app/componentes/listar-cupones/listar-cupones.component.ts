import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-cupones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listar-cupones.component.html',
  styleUrl: './listar-cupones.component.css'
})
export class ListarCuponesComponent {
filas  = [0,1,2,3]

constructor(private location: Location) {
}

    // Método para regresar a la página anterior
    regresar() {
      this.location.back();
    }
}
