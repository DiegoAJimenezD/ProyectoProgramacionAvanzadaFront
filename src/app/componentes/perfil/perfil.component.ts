import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  id: string = '';  // Asegúrate de tener un campo para guardar el id
  nombre: string = '';
  cedula: string = '';
  telefono: string = '';
  direccion: string = '';
  email: string = '';

  constructor(private clienteService: ClienteService,
              private router: Router,
              private tokenService: TokenService) {
    this.getCuenta();  // Llamamos al método al iniciar
  }

  // Método para obtener los datos de la cuenta
  getCuenta(): void {
    this.clienteService.getCuenta().subscribe({
      next: (data) => {
        console.log(data);
        // Asignamos los datos a las variables de la cuenta
        this.nombre = data.respuesta.nombre;
        this.cedula = data.respuesta.cedula;
        this.telefono = data.respuesta.telefono;
        this.direccion = data.respuesta.direccion;
        this.email = data.respuesta.email;
        this.id = data.respuesta.id;  // Asigna el id de la cuenta recibido de la API
      },
      error: (error) => {
        Swal.fire('Error', 'Hubo un problema al obtener los datos.', 'error');
        console.log(error);
      },
    });
  }

  // Método para abrir la edición del perfil
  public openEditarPefil(id: string): void {
    if (id) {
      // Navega a la página de edición pasando el id del usuario
      this.router.navigate(['/editar-perfil', id]);
    } else {
      Swal.fire('Error', 'No se ha encontrado el ID del usuario.', 'error');
    }
  }

  // Método para eliminar la cuenta
  public eliminarCuenta(id: string): void {
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
        this.clienteService.eliminarCuenta(id).subscribe({
          next: (data) => {
            if (!data.error) {
              Swal.fire('Eliminado', 'El cupón ha sido eliminado correctamente', 'success');
              this.logout(); // Recargar la lista de cupones después de eliminar
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

  // Método para cerrar sesión
  public logout(): void {
    this.tokenService.logout();  // El servicio de logout debe eliminar el token y redirigir
    this.router.navigate(['/login']);  // Redirige al login u otra página deseada
  }
}
