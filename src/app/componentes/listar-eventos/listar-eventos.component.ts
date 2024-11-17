import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  constructor(private location: Location,
    private adminService: AdministradorService,
    private router:Router,) {

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

  // Método para eliminar un cupón
  public eliminarEvento(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.eliminarEvento(id).subscribe({
          next: (data) => {
            if (!data.error) {
              Swal.fire('Eliminado', 'El evento ha sido eliminado correctamente', 'success');
              this.showEvents(); // Recargar la lista de cupones después de eliminar
            } else {
              Swal.fire('Error', 'No se pudo eliminar el cupón', 'error');
            }
          },
          error: (error) => {
            console.error('Error al eliminar el cupón:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el evento', 'error');
          }
        });
      }
    });
  }


  public openEditarEvento(id: string){
    this.router.navigate(['/editar-eventos/'+id])
  }


      // Método para regresar a la página anterior
      regresar() {
        this.location.back();
      }
}
