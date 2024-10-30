import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cambio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cambio.component.html',
  styleUrl: './cambio.component.css'
})
export class CambioComponent {
  cambioPassword!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.cambioPassword = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      confirmarPassword: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
    },
  );
  }

  public cambiar() {
    console.log(this.cambioPassword.value);
  }
}
