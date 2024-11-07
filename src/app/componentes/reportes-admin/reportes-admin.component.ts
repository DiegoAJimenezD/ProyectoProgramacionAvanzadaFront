import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reportes-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reportes-admin.component.html',
  styleUrl: './reportes-admin.component.css'
})


export class ReportesAdminComponent {
  nombreEvento = ['Nombre 1', 'Nombre 2', 'Nombre 3']
  selectedEvent: string = '';
  
  constructor(private location: Location) {
  }
  
      // Método para regresar a la página anterior
      regresar() {
        this.location.back();
      }
}
