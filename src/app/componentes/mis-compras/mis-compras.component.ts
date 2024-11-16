import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { PublicoService } from '../../servicios/publico.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent {
  compras: any = [];

  constructor(
    private tokenService: TokenService, 
    private clienteService: ClienteService, 
    private publicoService: PublicoService,
    private router: Router
  ) {
    this.listarHistorialOrdenesCompra();
  }

  public listarHistorialOrdenesCompra() {

    const codigoCliente = this.tokenService.getIDCuenta();

    this.clienteService.listarHistorialCompras(codigoCliente).subscribe({
      next: (data) => {
        console.log(data);
        this.compras = data.respuesta;
      },
      error: (error) => {
        console.log(error.error);
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
  }

  public getOrden(id: string): any {
    this.router.navigate(['/compra-realizada/'+id])
  }
}
