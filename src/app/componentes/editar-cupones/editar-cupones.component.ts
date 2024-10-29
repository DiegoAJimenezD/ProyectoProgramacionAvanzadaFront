import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-cupones',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-cupones.component.html',
  styleUrl: './editar-cupones.component.css'
})
export class EditarCuponesComponent {
  editarCuponForm!: FormGroup;
  tiposDeCupon: string[];

  constructor(private formBuilder: FormBuilder) {
   this.crearFormulario();
   this.tiposDeCupon = ['MULTIPLE', 'UNICO'];
  }



  private crearFormulario() {
    this.editarCuponForm = this.formBuilder.group({
     nombre: ['', [Validators.required]],
     codigo: ['', [Validators.required]],
     porcentaje: ['', [Validators.required]],
     fecha_vencimiento: ['', [Validators.required]],
     tipo: ['', [Validators.required]],
   });
}

public editarCupon() {
  console.log(this.editarCuponForm.value);
}
}
