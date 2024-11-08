import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent {
  compras = [0,1,2,3]
}
