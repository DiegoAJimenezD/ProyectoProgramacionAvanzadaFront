import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crear-cupones',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './crear-cupones.component.html',
  styleUrl: './crear-cupones.component.css'
})
export class CrearCuponesComponent {

  crearCuponForm!: FormGroup;
  tiposDeCupon: string[];

  constructor(private formBuilder: FormBuilder, private location: Location) {
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
    // Método para regresar a la página anterior
    regresar() {
      this.location.back();
    }
}

