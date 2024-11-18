import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth/auth.service';
import { CrearCuentaDTO } from '../../interfaces/Cuenta/crear-cuenta-dto';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import { EditarCuentaDTO } from '../../interfaces/Cuenta/editar-cuenta-dto';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  editarPerfil!: FormGroup;  // Formulario de edición
  cuenta: any = {};  // Almacena los datos de la cuenta

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) { 
    this.crearFormulario();  // Inicializar el formulario

    // Obtener el id desde la URL
    const id = this.activatedRoute.snapshot.paramMap.get('id'); 
    if (id) {
      this.obtenerCuenta(id);  // Cargar la cuenta si el id está presente
    }
  }

  // Método para obtener los datos de la cuenta
  obtenerCuenta(id: string): void {
    this.clienteService.obtenerCuenta(id).subscribe({
      next: (data) => {
        console.log(data);
        this.cuenta = data.respuesta;

        // Utilizamos patchValue para actualizar los valores del formulario
        this.editarPerfil.patchValue({
          id: this.cuenta.id,
          nombre: this.cuenta.nombre,
          cedula: this.cuenta.cedula,
          telefono: this.cuenta.telefono,
          direccion: this.cuenta.direccion,
          email: this.cuenta.email
        });
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo obtener la cuenta', 'error');
        console.error('Error al obtener la cuenta:', error);
      }
    });
  }

  // Método para guardar los cambios
  guardarCambios(): void {
    // Marcar todos los controles como tocados y actualizar su validez
    Object.values(this.editarPerfil.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    // Verificamos si el formulario es válido antes de enviarlo
    if (this.editarPerfil.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos correctamente.', 'error');
      return;
    }

    // Obtener los valores del formulario y crear el objeto EditarCuentaDTO
    const editarCuentaDTO = this.editarPerfil.value as EditarCuentaDTO;
    console.log('Datos a enviar:', editarCuentaDTO); // Verificar los valores

    // Llamar al servicio para actualizar la cuenta
    this.clienteService.actualizarCuenta(editarCuentaDTO).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Cuenta actualizada correctamente', 'success');
        this.router.navigate(['/perfil']);  // Regresar a la página de perfil
      },
      error: (error) => {
        Swal.fire('Error', 'Hubo un problema al actualizar la cuenta', 'error');
        console.error('Error al actualizar la cuenta:', error);
      }
    });
  }

  // Crear el formulario con los controles necesarios
  private crearFormulario() {
    this.editarPerfil = this.formBuilder.group({
      id: [''],  // Agregar id para enviar al backend
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
    },
    );
  }
}
