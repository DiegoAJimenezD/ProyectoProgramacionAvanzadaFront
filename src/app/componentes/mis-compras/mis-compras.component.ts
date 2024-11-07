import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [],
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent {
  compras = [0,1,2,3]
}
