import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cupones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listar-cupones.component.html',
  styleUrl: './listar-cupones.component.css'
})
export class ListarCuponesComponent {
  cupones: any[] = [];
  
  constructor(private location: Location, private adminService: AdministradorService) {
    this.showCoupons(); // Mostrar cupones cuando se carga el componente
  }

  // Método para mostrar los cupones
  public showCoupons() {
    this.adminService.listarCuponesAdmin().subscribe({
      next: (data) => {
        console.log(data);
        this.cupones = data.respuesta; // Los cupones deben tener el 'id' y el 'codigo'
      },
      error: (error) => {
        Swal.fire(error.respuesta); // Si hay un error, se muestra el mensaje
        console.log(error);
      },
    });
  }
  
  // Método para regresar a la página anterior
  regresar() {
    this.location.back();
  }
}
