import { Component } from '@angular/core';
import { AdministradorService } from '../../servicios/administrador.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-pqrs',
  standalone: true,
  imports: [],
  templateUrl: './listar-pqrs.component.html',
  styleUrl: './listar-pqrs.component.css'
})
export class ListarPqrsComponent {

  pqrs: any[] = []

  constructor(
    private adminService: AdministradorService,
    private router:Router,) {
    this.showPqrs(); // Mostrar cupones cuando se carga el componente
  }

    // Método para mostrar los cupones
    public showPqrs() {
      this.adminService.listarPqrs().subscribe({
        next: (data) => {
          console.log('pqrs:', data);  // Verifica qué datos estás recibiendo
          this.pqrs = data.respuesta;
        },
        error: (error) => {
          Swal.fire(error.respuesta);
          console.log(error);
        }
      });
    }

  // Método para abrir la edición del perfil
  public openResponderPqr(id: string): void {
    if (id) {
      // Navega a la página de edición pasando el id del usuario
      this.router.navigate(['/responder-pqrs', id]);
    } else {
      Swal.fire('Error', 'No se ha encontrado el ID del pqrs.', 'error');
    }
  }

}
