import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../servicios/auth/auth.service';
import { CrearPqrDTO } from '../../interfaces/Pqrs/crear-pqrs-dto';
import Swal from 'sweetalert2';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-pqrs',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css'
})
export class PqrsComponent {

  crearPqrs! : FormGroup;
  tiposDePQRS: string[];

  constructor(private formBuilder: FormBuilder, private location: Location,
    private clienteService: ClienteService, private router: Router,
    private tokenService: TokenService, 
  ) {
    this.crearPQRS();
    this.tiposDePQRS = ['PETICION', 'QUEJA', 'RECLAMO', 'SOLICITUD', 'FELICITACION'];
   }

   private crearPQRS() {
    this.crearPqrs = this.formBuilder.group({
     tipo: ['', [Validators.required]],
     descripcion: ['', [Validators.required]],
   });
  }


  public enviar() {
    // Obtener el idCliente (idCuenta) desde el servicio de token
    const codigoCuenta = this.tokenService.getIDCuenta();
  
    // Obtener el objeto CrearPqrDTO desde el formulario
    const crearPqr = this.crearPqrs.value as CrearPqrDTO;
  
    // Añadir el idCliente al objeto pqrDTO
    const pqrConIdCuenta = { ...crearPqr, idCuenta: codigoCuenta };
  
    // Enviar el objeto pqrDTO al servicio
    this.clienteService.crearPqr(pqrConIdCuenta).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'PQRS creado',
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
        });
      }
    });
  }
  
  
  

  public iniciar(){
    console.log(this.crearPqrs.value);
   }

       // Método para regresar a la página anterior
       regresar() {
        this.location.back();
      }
}
