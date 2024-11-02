import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-eventos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listar-eventos.component.html',
  styleUrl: './listar-eventos.component.css'
})
export class ListarEventosComponent {
  filas  = [0,1,2,3]
}
