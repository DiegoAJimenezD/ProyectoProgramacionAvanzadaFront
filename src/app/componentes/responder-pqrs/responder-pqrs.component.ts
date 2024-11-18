import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import Swal from 'sweetalert2';
import { CommonModule, Location } from '@angular/common';
import { ResponderPqrDTO } from '../../interfaces/Pqrs/responder-pqrs';
import { AuthService } from '../../servicios/auth/auth.service';

@Component({
  selector: 'app-responder-pqrs',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './responder-pqrs.component.html',
  styleUrl: './responder-pqrs.component.css'
})
export class ResponderPqrsComponent {
  responderPqrForm!: FormGroup;
  id: string = '';
  tipo: string = '';  // Asegúrate de tener un campo para guardar el id
  descripcion: string = '';
  estado: string = '';
  fechaCreacion: string = '';
  respuesta: string = '';
  idCliente: string = '';



  constructor(private adminService: AdministradorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute ) {

    this.responderPqr();

    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener el id de la URL
    if (id) {
      this.getPqr(id); // Llamar al método con el id
    }
}

  // Método para crear el formulario
  private responderPqr() {
    const idPqr = this.activatedRoute.snapshot.paramMap.get('id');
    this.responderPqrForm = this.formBuilder.group({
      id: [idPqr],
      respuesta: ['', [Validators.required]]
    });
  }


  public responder() {
    const responderPqr = this.responderPqrForm.value as ResponderPqrDTO;

    this.adminService.responderPqr(responderPqr).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'PQRS resuelto',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

    // Método para obtener los datos de la cuenta
    getPqr(id: string): void {
      this.adminService.getPqr(id).subscribe({
        next: (data) => {
          console.log(data);
          // Asignamos los datos a las variables de la cuenta
          this.tipo = data.respuesta.tipo;
          this.estado = data.respuesta.estado;
          this.descripcion = data.respuesta.descripcion;
          this.fechaCreacion = data.respuesta.fechaCreacion;
          this.id = data.respuesta.id; 
          this.respuesta = data.respuesta.respuesta;
          this.idCliente = data.respuesta.idCliente; // Asigna el id de la cuenta recibido de la API
        },
        error: (error) => {
          Swal.fire('Error', 'Hubo un problema al obtener los datos.', 'error');
          console.log(error);
        },
      });
    }

      // Método para abrir la edición del perfil
  public openResponderPqr(id: string): void {
    if (id) {
      // Navega a la página de edición pasando el id del usuario
      this.router.navigate(['/responder-pqrs', id]);
    } else {
      Swal.fire('Error', 'No se ha encontrado el ID del usuario.', 'error');
    }
  }

      // Método para regresar a la página anterior
  regresar() {
    this.location.back();
  }
}
