import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { PublicoService } from '../../servicios/publico.service';

@Component({
  selector: 'app-info-evento',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './info-evento.component.html',
  styleUrl: './info-evento.component.css'
})

export class InfoEventoComponent {
  item: any;
  constructor(private router: Router,
    private publicoService: PublicoService,
    private activatedRoute: ActivatedRoute // Inyectar ActivatedRoute
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener el id de la URL
    if (id) {
      this.getEvent(id); // Llamar al método con el id
    }
  }

  public getEvent(id: string) {
    this.publicoService.obtenerEvento(id).subscribe({
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
    this.router.navigate(['inicio']);
  }

  public openRealizarCompra(id: string){
      this.router.navigate(['/realizar-compra/'+id]);
  }
}
