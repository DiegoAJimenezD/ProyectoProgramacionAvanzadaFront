import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(private formBuilder: FormBuilder, private location: Location) {
    this.crearPQRS();
    this.tiposDePQRS = ['Petición', 'Quejas', 'Reclamos', 'Sugerencias'];
   }

   private crearPQRS() {
    this.crearPqrs = this.formBuilder.group({
     tipo: ['', [Validators.required]],
     descripcion: ['', [Validators.required]],
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
