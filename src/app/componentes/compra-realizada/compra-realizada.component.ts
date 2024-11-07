import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-compra-realizada',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './compra-realizada.component.html',
  styleUrl: './compra-realizada.component.css'
})
export class CompraRealizadaComponent {
  localidades = ["1","2"];
  
  constructor( private location: Location) {
  }

      // Método para regresar a la página anterior
      regresar() {
        this.location.back();
      }
}
