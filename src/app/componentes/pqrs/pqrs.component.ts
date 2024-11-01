import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pqrs',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css'
})
export class PqrsComponent {

  crearPqrs! : FormGroup;
  tiposDePQRS: string[];

  constructor(private formBuilder: FormBuilder) {
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
}
