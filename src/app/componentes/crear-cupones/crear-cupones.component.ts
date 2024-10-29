import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-cupones',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-cupones.component.html',
  styleUrl: './crear-cupones.component.css'
})
export class CrearCuponesComponent {

  crearCuponForm!: FormGroup;
  tiposDeCupon: string[];

  constructor(private formBuilder: FormBuilder) {
   this.crearFormulario();
   this.tiposDeCupon = ['MULTIPLE', 'UNICO'];
  }



  private crearFormulario() {
    this.crearCuponForm = this.formBuilder.group({
     nombre: ['', [Validators.required]],
     codigo: ['', [Validators.required]],
     porcentaje: ['', [Validators.required]],
     fecha_vencimiento: ['', [Validators.required]],
     tipo: ['', [Validators.required]],
   });
}

public crearCupon() {
  console.log(this.crearCuponForm.value);
}
}

