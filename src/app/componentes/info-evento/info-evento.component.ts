import { Component } from '@angular/core';
import { EventoService } from '../../servicios/evento.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-evento',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './info-evento.component.html',
  styleUrl: './info-evento.component.css'
})
export class InfoEventoComponent {
  item: any;
  constructor(
    private eventoService: EventoService,
    private activatedRoute: ActivatedRoute // Inyectar ActivatedRoute
  ){
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener el id de la URL
    if (id) {
      this.getEvent(id); // Llamar al método con el id
    }
  }

  public getEvent(id:string) {
    this.eventoService.getEvent(id).subscribe({
      next: (data) => {
        console.log(data);
        this.item = data.respuesta;
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
