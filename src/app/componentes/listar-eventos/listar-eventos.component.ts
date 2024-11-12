import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-eventos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listar-eventos.component.html',
  styleUrl: './listar-eventos.component.css'
})
export class ListarEventosComponent {
  eventos: any[] = [];

  constructor(private location: Location, private adminService: AdministradorService) {
    this.showEvents();
  }
  
  public showEvents() {
    this.adminService.listarEventosAdmin().subscribe({
      next: (data) => {
        console.log(data);
        this.eventos = data.respuesta;
      },
      error: (error) => {
        Swal.fire(error.respuesta)
        console.log(error);
      },
    });

  }
      // Método para regresar a la página anterior
      regresar() {
        this.location.back();
      }
}
