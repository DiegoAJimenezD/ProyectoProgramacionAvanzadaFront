import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { EliminarItemCarritoDTO } from '../../interfaces/Carrito/eliminar-item-carrito-dto';
import { CrearOrdenDTO } from '../../interfaces/Orden/crear-orden-dto';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditarItemCarritoDTO } from '../../interfaces/Carrito/editar-item-carrito-dto';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carritos: any = [];  
  isModalOpen: boolean = false;
  editarForm!: FormGroup;
  indiceSeleccionado!: number;

  constructor(
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.crearFormulario();
    this.listarCarrito();
  }

  public crearFormulario(){
    this.editarForm = this.formBuilder.group({
      idEvento: ['', Validators.required],
      idCuenta: [this.tokenService.getIDCuenta(), Validators.required],
      localidad: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
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

  public editarItemCarrito() {
    const editarItemCarritoDTO = this.editarForm.value as EditarItemCarritoDTO;

    this.clienteService.editarItemCarrito(editarItemCarritoDTO).subscribe({
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

  abrirModal(item: any, index: number) {
    this.indiceSeleccionado = index;
    this.editarForm.patchValue({
      localidad: item.nombreLocalidad,
      cantidad: item.cantidad,
      idEvento: item.evento.id
    });
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  guardarCambios() {
    if (this.editarForm.valid) {
      const itemActualizado = this.editarForm.value;
      this.carritos.items[this.indiceSeleccionado] = {
        ...this.carritos.items[this.indiceSeleccionado],
        ...itemActualizado
      };
      this.cerrarModal();
      this.editarItemCarrito();
    }
  }

  public async realizarPago(i: number) {
    const codigoCliente = this.tokenService.getIDCuenta();
  
    const item = {
      estadoOrden: "ACTIVO",
      idCliente: codigoCliente,
      items: [{
        id: codigoCliente,
        idEvento: this.carritos.items[i].evento.id,
        precio: this.carritos.items[i].precio,
        nombreLocalidad: this.carritos.items[i].nombreLocalidad,
        cantidad: this.carritos.items[i].cantidad
      }],
      total: this.carritos.items[i].precio * this.carritos.items[i].cantidad
    };
  
    const crearOrdenDTO = item as CrearOrdenDTO;
  
    try {
      Swal.fire({
        title: "Cargando",
        html: "En un momento sera redireccionado a la pasarela de pago",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
        }
      });
      // Crear la orden y obtener la respuesta
      const ordenResponse = await firstValueFrom(this.clienteService.crearOrden(crearOrdenDTO));
      console.log('Orden creada:', ordenResponse);
  
      // Realizar el pago utilizando la respuesta de la orden
      const pagoResponse = await firstValueFrom(this.clienteService.realizarPago(ordenResponse.respuesta));
      console.log('Pago realizado:', pagoResponse);
  
      this.eliminarItemCarrito(this.carritos.items[i].evento.id, this.carritos.items[i].nombreLocalidad);
      // Redirigir a la página de pago
      window.location.href = pagoResponse.respuesta.initPoint;
    } catch (error: any) {
      console.error('Error en el proceso de pago:', error);
      Swal.fire("Error!", error?.error?.respuesta || "Ocurrió un error", "error");
    }
  }
  
}
