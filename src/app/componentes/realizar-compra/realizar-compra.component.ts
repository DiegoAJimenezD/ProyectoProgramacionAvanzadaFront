import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-realizar-compra',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './realizar-compra.component.html',
  styleUrl: './realizar-compra.component.css'
})
export class RealizarCompraComponent {

  compraForm!: FormGroup;
  general: number[];
  vip: number[];

  constructor(private formBuilder: FormBuilder) { 
    this.crearFormulario();
    this.general = [0,1,2,3,4,5];
    this.vip = [0,1,2,3,4,5]
  }

  private crearFormulario() {
    this.compraForm = this.formBuilder.group({
      general: ['', [Validators.required]],
      vip: ['', [Validators.required]]
    },
  );
  }

  public realizarCompra() {
    console.log(this.compraForm.value);
  }
}
