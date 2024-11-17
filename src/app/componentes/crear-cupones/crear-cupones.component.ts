import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { CrearCuponDTO } from '../../interfaces/Cupon/crear-cupon-dto'; // Importa MensajeDTO
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';
import { MensajeDTO } from '../../interfaces/mensaje-dto';

@Component({
  selector: 'app-crear-cupones',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './crear-cupones.component.html',
  styleUrl: './crear-cupones.component.css'
})
export class CrearCuponesComponent {

  crearCuponForm!: FormGroup;  // Formulario reactivo
  tiposDeCupon: any[] = [];    // Lista de tipos de cupones

  constructor(private formBuilder: FormBuilder, 
              private location: Location,
              private adminService: AdministradorService) {
    this.crearFormulario();  // Inicializa el formulario
    this.listarCuponesAdmin();  // Obtiene los tipos de cupones
  }

  // Método para crear el formulario reactivo
  private crearFormulario() {
    this.crearCuponForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],  // Nombre del cupón
      codigo: ['', [Validators.required]],  // Código del cupón
      descuento: ['', [Validators.required, Validators.min(1), Validators.max(100)]],  // Descuento (porcentaje)
      fechaVencimiento: ['', [Validators.required]],  // Fecha de vencimiento
      tipoCupon: ['', [Validators.required]],  // Tipo de cupón
      estadoCupon: 'DISPONIBLE',
    });
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

// Método para crear el cupón
public crearCupon() {
  // Verifica si el formulario es inválido
  if (this.crearCuponForm.invalid) {
    Swal.fire('Formulario incompleto', 'Por favor, rellene todos los campos correctamente.', 'error');
    return;  // Si el formulario es inválido, no hace nada
  }

  // Crea el objeto DTO con los valores del formulario
  const nuevoCupon: CrearCuponDTO = this.crearCuponForm.value;

  // Llama al servicio para crear el cupón
  this.adminService.crearCupon(nuevoCupon).subscribe({
    next: () => {
      Swal.fire("Éxito!", "Se ha creado un nuevo evento.", "success");
    },
    error: (error) => {
      Swal.fire(error.respuesta)
      console.log(error);
    },
  });
}


  // Método para regresar a la página anterior
  regresar() {
    this.location.back();
  }
}
