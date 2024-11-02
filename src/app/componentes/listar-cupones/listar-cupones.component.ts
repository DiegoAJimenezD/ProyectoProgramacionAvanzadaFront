import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-cupones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listar-cupones.component.html',
  styleUrl: './listar-cupones.component.css'
})
export class ListarCuponesComponent {
filas  = [0,1,2,3]
}
