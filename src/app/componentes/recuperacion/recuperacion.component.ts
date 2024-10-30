import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {
  recuperarCuenta!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.recuperarCuenta = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    },
  );
  }

  public recuperar() {
    console.log(this.recuperarCuenta.value);
  }
}
