import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-realizar-compra',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './realizar-compra.component.html',
  styleUrl: './realizar-compra.component.css'
})
export class RealizarCompraComponent {

  localidades = [0, 1, 2];

  compraForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private location: Location) {
    this.crearFormulario();
  }

  private crearFormulario() {
    //   this.compraForm = this.formBuilder.group({
    //     general: ['', [Validators.required]],
    //     vip: ['', [Validators.required]]
    //   },
    // );
  }

  public realizarCompra() {
    console.log(this.compraForm.value);
  }

    // Método para regresar a la página anterior
    regresar() {
      this.location.back();
    }
}
