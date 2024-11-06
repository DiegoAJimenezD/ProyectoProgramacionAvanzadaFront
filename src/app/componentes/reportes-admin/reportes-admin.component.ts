import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes-admin',
  standalone: true,
  imports: [],
  templateUrl: './reportes-admin.component.html',
  styleUrl: './reportes-admin.component.css'
})


export class ReportesAdminComponent {
  nombreEvento = ['Nombre 1', 'Nombre 2', 'Nombre 3']
  selectedEvent: string = '';
}
