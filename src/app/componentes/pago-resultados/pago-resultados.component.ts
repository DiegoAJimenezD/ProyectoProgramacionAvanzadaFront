import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-resultados',
  standalone: true,
  imports: [],
  templateUrl: './pago-resultados.component.html',
  styleUrl: './pago-resultados.component.css'
})
export class PagoResultadosComponent {
  estado: string | null;
  idOrden: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) {
    this.estado = this.activatedRoute.snapshot.paramMap.get('estado'); // Obtener el id de la URL
  }

  // Método para redirigir al usuario a la página de detalles de la orden
  irAlDetalleOrden(): void {
    // Aquí puedes redirigir al usuario a la página de detalles de su orden
    // Ejemplo de redirección con Angular Router
    // window.location.href = `/detalle-orden/${this.idOrden}`;
  }

  // Método para intentar el pago nuevamente
  intentarNuevamente(): void {
    // Aquí podrías redirigir al usuario a la página donde puede intentar realizar el pago nuevamente
    // O permitirle modificar la forma de pago
    // alert('Redirigiendo para intentar el pago nuevamente...');
  }

  // Método para consultar el estado del pago
  consultarEstadoPago(): void {
    // Puedes redirigir a una página que consulte el estado del pago
    // o actualizar el estado de la transacción con una llamada al backend.
    // alert('Consultando estado del pago...');
  }
}
