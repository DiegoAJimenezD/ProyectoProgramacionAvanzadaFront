import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-realizar-compra',
  standalone: true,
  imports: [],
  templateUrl: './realizar-compra.component.html',
  styleUrl: './realizar-compra.component.css'
})
export class RealizarCompraComponent {

  compraForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) {
   }



}
