import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { PublicoService } from '../../servicios/publico.service';

@Component({
  selector: 'app-reportes-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reportes-admin.component.html',
  styleUrl: './reportes-admin.component.css'
})


export class ReportesAdminComponent {
  tipos: any[] = [];
  selectedEvent: string = '';
  
  constructor(
    private location: Location,
    private publicoService: PublicoService,
  ) {

    this.listarTipos();
  }
  
      // Método para regresar a la página anterior
      regresar() {
        this.location.back();
      }
  
        // Listar tipos de eventos desde el servicio
  public listarTipos() {
    this.publicoService.listarTipos().subscribe({
      next: (data) => {
        this.tipos = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
