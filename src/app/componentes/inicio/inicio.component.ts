import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { EventoService } from '../../servicios/evento.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

  items: any[] = [];

  constructor(private eventoService: EventoService, private router:Router) {
    this.items = [];
    this.showEvents();
  }

  public showEvents() {
    this.eventoService.showEvents().subscribe({
      next: (data) => {
        console.log(data);
        this.items = data.respuesta;
      },
      error: (error) => {
        Swal.fire(error.respuesta)
        console.log(error);
      },
    });

  }

  public openPage(id: string){
    this.router.navigate(['/info-evento/'+id])
  }
}
