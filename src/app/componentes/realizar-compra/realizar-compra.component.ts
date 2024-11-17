import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { PublicoService } from '../../servicios/publico.service';
import { ClienteService } from '../../servicios/cliente.service';
import { AgregarItemCarritoDTO } from '../../interfaces/Carrito/agregar-item-carrito-dto';
import { TokenService } from '../../servicios/token.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-realizar-compra',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './realizar-compra.component.html',
  styleUrls: ['./realizar-compra.component.css'],
})
export class RealizarCompraComponent {
  idEvento: string | null;
  localidades: any[] = [];
  img: any;
  total: number = 0;
  compraForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private publicoService: PublicoService,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private tokenService: TokenService,
    private router: Router,
  ) {
    this.idEvento = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener el id de la URL
    if (this.idEvento) {
      this.getEvent(this.idEvento); // Llamar al método con el id
    }
    this.crearFormulario();
  }

  // Obtener el evento desde el servicio
  public getEvent(id: string) {
    this.publicoService.obtenerEvento(id).subscribe({
      next: (data) => {
        this.localidades = data.respuesta.localidades;
        this.img = data.respuesta.imagenLocalidades;
        // Sincronizar el FormArray con las localidades cargadas
        this.agregarLocalidades();
      },
      error: (error) => {
        Swal.fire(error.respuesta);
        console.log(error);
      },
    });
  }

  // Crear el formulario inicial
  private crearFormulario() {
    this.compraForm = this.formBuilder.group({
      items: this.formBuilder.array([]), // Inicializamos el FormArray vacío
    });
  }

  // Getter para el FormArray
  get items(): FormArray {
    return this.compraForm.get('items') as FormArray;
  }

  // Agregar localidades al FormArray dinámicamente
  private agregarLocalidades() {
    this.localidades.forEach((localidad) => {
      const grupo = this.formBuilder.group({
        id: [this.tokenService.getIDCuenta()],
        idEvento: [this.idEvento],
        localidad: [localidad.nombre, [Validators.required, Validators.min(0)]],
        cantidad: [0, [Validators.required, Validators.min(0)]],
        precio: [localidad.precio], // Campo no editable
        precioTotal: [{ value: 0, disabled: true }], // Campo calculado, no editable
      });

      this.items.push(grupo);
    });
  }

  // Calcular los totales de cada fila y el total general
  calcularTotales(index: number) {
    const item = this.items.at(index);
    const cantidad = item.get('cantidad')?.value || 0;
    const precio = item.get('precio')?.value || 0;

    // Calcular el subtotal para la fila actual
    const subtotal = cantidad * precio;
    item.get('precioTotal')?.setValue(subtotal);

    // Recalcular el total general
    this.total = this.items.controls.reduce((sum, group) => {
      return sum + (group.get('precioTotal')?.value || 0);
    }, 0);
  }

  // Confirmar la compra
  public realizarCompra() {
    console.log('Datos de la compra:', this.compraForm.value);
    // const loginDTO = this.compraForm.value as LoginDTO;

    // this.clienteService.realizarCompra(crearEventoDTO).subscribe({
    //   next: () => {
    //     Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
    //   },
    //   error: error => {
    //     Swal.fire("Error!", error.error.respuesta, "error");
    //   }
    // });
  }

  async agregarCarrito() {
    console.log('Datos de la compra:', this.compraForm.value.items);
  
    for (const localidad of this.compraForm.value.items) {
      if (localidad.cantidad > 0) {
        const agregarItemCarritoDTO = localidad as AgregarItemCarritoDTO;
  
        try {
          const data = await firstValueFrom(this.clienteService.agregarCarrito(agregarItemCarritoDTO));
          console.log(data.respuesta);
  
          // Mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Producto agregado al carrito',
          });
        this.router.navigate(["/inicio"]);

        } catch (error: any) {
          // Mostrar mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.respuesta || 'Ocurrió un error',
          });
        }
      }
    }
  }
  

  // Método para regresar a la página anterior
  regresar() {
    this.location.back();
  }
}
