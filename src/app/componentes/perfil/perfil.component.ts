import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  nombre: string = '';
  cedula: string = '';
  telefono: string = '';
  direccion: string = '';
  email: string = '';

  constructor(private clienteService: ClienteService) {
    
    this.getCuenta(); // Llamamos al método al iniciar
  }


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
      },
      error: (error) => {
        Swal.fire('Error', 'Hubo un problema al obtener los datos.', 'error');
        console.log(error);
      },
    });
  }
  

  
  

}
