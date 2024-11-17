import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { EliminarItemCarritoDTO } from '../../interfaces/Carrito/eliminar-item-carrito-dto';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carritos: any = [];
  constructor(
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.listarCarrito();
  }
  public listarCarrito() {

    const codigoCliente = this.tokenService.getIDCuenta();

    this.clienteService.listarCarrito(codigoCliente).subscribe({
      next: (data) => {
        console.log(data);
        this.carritos = data.respuesta;
      },
      error: (error) => {
        console.log(error.error);
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
  }

  public eliminarItemCarrito(idEvento: string, localidad: string) {
    const codigoCliente = this.tokenService.getIDCuenta();
    var item = { "idCuenta": codigoCliente, "idEvento": idEvento, "localidad": localidad }
    const eliminarItemCarritoDTO = item as EliminarItemCarritoDTO;

    this.clienteService.eliminarItemCarrito(eliminarItemCarritoDTO).subscribe({
      next: (data) => {
        console.log(data);
        this.listarCarrito();
      },
      error: (error) => {
        console.log(error.error);
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });
  }
}
