import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { EditarCuponDTO } from '../../interfaces/Cupon/editar-cupon-dto';

@Component({
  selector: 'app-editar-cupones',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './editar-cupones.component.html',
  styleUrl: './editar-cupones.component.css'
})
export class EditarCuponesComponent {
  editarCuponForm!: FormGroup;
  tiposDeCupon: any[] = [];    // Lista de tipos de cupones
  cupon: any = {}; // Para almacenar el cupón a editar

  constructor(private formBuilder: FormBuilder, private location: Location,
    private activatedRoute: ActivatedRoute,
    private adminService: AdministradorService,
  ) {
    this.crearFormulario();
    this.listarCuponesAdmin();  // Obtiene los tipos de cupones

    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener el id de la URL
    if (id) {
      this.obtenerCupon(id); // Llamar al método con el id
    }
  }

  // Listar tipos de cupones desde el servicio
  public listarCuponesAdmin() {
    this.adminService.listarTipoCupones().subscribe({
      next: (data) => {
        this.tiposDeCupon = data.respuesta;  // Asigna los tipos de cupones a la variable
        console.log(data);  // Muestra los tipos en consola
      },
      error: (error) => {
        console.error(error);  // Maneja errores si ocurre algún problema
      },
    });
  }


  obtenerCupon(id: string): void {
    this.adminService.obtenerCupon(id).subscribe({
      next: (data) => {
        console.log(data);
        this.cupon = data.respuesta;
  
        // Utilizamos patchValue para actualizar los valores del formulario
        this.editarCuponForm.patchValue({
          id: this.cupon.id,
          nombre: this.cupon.nombre,
          codigo: this.cupon.codigo,
          descuento: this.cupon.descuento,
          fechaVencimiento: this.cupon.fechaVencimiento,
          tipoCupon: this.cupon.tipoCupon,
          estadoCupon: this.cupon.estadoCupon
        });
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo obtener el cupón', 'error');
        console.error('Error al obtener el cupón:', error);
      }
    });
  }
  
  
  guardarCambios(): void {
    // Marcar todos los controles como tocados y actualizar su validez
    Object.values(this.editarCuponForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    // Obtener los valores del formulario y crear el objeto EditarCuponDTO
    const editarCuponDTO = this.editarCuponForm.value as EditarCuponDTO;
    console.log('Datos a enviar:', editarCuponDTO); // Verificar los valores

    // Llamar al servicio para actualizar el cupón
    this.adminService.actualizarCupon(editarCuponDTO).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Cupón actualizado correctamente', 'success');
        this.location.back(); // Regresar a la página anterior
      },
      error: (error) => {
        Swal.fire('Error', 'Hubo un problema al actualizar el cupón', 'error');
        console.error('Error al actualizar el cupón:', error);
      }
    });
  }
  

  private crearFormulario(idCupon: string = '') {
    this.editarCuponForm = this.formBuilder.group({
      id: [idCupon, [Validators.required]], // Carga el ID del cupón
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      descuento: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      tipoCupon: ['', [Validators.required]],
      estadoCupon: ['DISPONIBLE', [Validators.required]]
    });
  }

  public editarCupon() {
    console.log(this.editarCuponForm.value);
  }
  // Método para regresar a la página anterior
  regresar() {
    this.location.back();
  }
}
