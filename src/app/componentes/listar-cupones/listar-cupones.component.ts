import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  
  
  constructor(private location: Location,
    private adminService: AdministradorService,
    private router:Router,) {
    this.showCoupons(); // Mostrar cupones cuando se carga el componente
  }



  // Método para eliminar un cupón
  public eliminarCupon(id: string): void {
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
        this.adminService.eliminarCupon(id).subscribe({
          next: (data) => {
            if (!data.error) {
              Swal.fire('Eliminado', 'El cupón ha sido eliminado correctamente', 'success');
              this.showCoupons(); // Recargar la lista de cupones después de eliminar
            } else {
              Swal.fire('Error', 'No se pudo eliminar el cupón', 'error');
            }
          },
          error: (error) => {
            console.error('Error al eliminar el cupón:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el cupón', 'error');
          }
        });
      }
    });
  }





  // Método para mostrar los cupones
  public showCoupons() {
    this.adminService.listarCupones().subscribe({
      next: (data) => {
        console.log('Cupones:', data);  // Verifica qué datos estás recibiendo
        this.cupones = data.respuesta;
      },
      error: (error) => {
        Swal.fire(error.respuesta);
        console.log(error);
      }
    });
  }

  public openEditarCupon(id: string){
    this.router.navigate(['/editar-cupones/'+id])
  }
  
  // Método para regresar a la página anterior
  regresar() {
    this.location.back();
  }
}
