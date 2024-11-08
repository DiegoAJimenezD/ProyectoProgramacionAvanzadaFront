import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-qr-compra',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './qr-compra.component.html',
  styleUrl: './qr-compra.component.css'
})
export class QrCompraComponent {
  constructor(private location: Location) {
  }
  
      // Método para regresar a la página anterior
      regresar() {
        this.location.back();
      }
}
