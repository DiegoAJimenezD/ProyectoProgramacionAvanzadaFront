import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {
  recuperarCuenta!: FormGroup;

  constructor(private formBuilder: FormBuilder, private location: Location) { 
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

      // Método para regresar a la página anterior
      regresar() {
        this.location.back();
      }
}
