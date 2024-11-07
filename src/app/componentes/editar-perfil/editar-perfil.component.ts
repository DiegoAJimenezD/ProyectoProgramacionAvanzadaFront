import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth/auth.service';
import { CrearCuentaDTO } from '../../interfaces/crear-cuenta-dto';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  editarPerfil!: FormGroup;


  constructor(private formBuilder: FormBuilder, private authService: AuthService) { 
   this.crearFormulario();
 }
 
 private crearFormulario() {
   this.editarPerfil = this.formBuilder.group({
     cedula: ['', [Validators.required]],
     nombre: ['', [Validators.required]],
     email: ['', [Validators.required, Validators.email]],
     direccion: ['', [Validators.required]],
     telefono: ['', [Validators.required, Validators.maxLength(10)]],
     password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
     confirmaPassword : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]]
   },
   { validators: this.passwordsMatchValidator } as AbstractControlOptions
 );
 }
 
 public registrar() {
   const crearCuenta = this.editarPerfil.value as CrearCuentaDTO;
  
  
   this.authService.crearCuenta(crearCuenta).subscribe({
     next: (data) => {
       Swal.fire({
         title: 'Cuenta creada',
         text: 'La cuenta se ha creado correctamente',
         icon: 'success',
         confirmButtonText: 'Aceptar'
       })
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
  
 
 passwordsMatchValidator(formGroup: FormGroup) {
   const password = formGroup.get('password')?.value;
   const confirmaPassword = formGroup.get('confirmaPassword')?.value;
  
  
   // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
   return password == confirmaPassword ? null : { passwordsMismatch: true };
  }
}
