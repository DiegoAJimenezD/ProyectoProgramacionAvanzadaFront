import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ClienteService } from '../../servicios/cliente.service';

@Component({
  selector: 'app-qr-compra',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './qr-compra.component.html',
  styleUrl: './qr-compra.component.css'
})
export class QrCompraComponent {
  id: string | null;
  img: string;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener el id de la URL
    this.img = "";
    if (this.id) {
      this.getQr(); // Llamar al método con el id
    }
  }

  public getQr() {
    this.img = this.clienteService.getQr(this.id);
  }

  // Método para regresar a la página anterior
  regresar() {
    this.location.back();
  }
}
