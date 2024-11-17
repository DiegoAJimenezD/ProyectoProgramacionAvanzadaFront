import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra-realizada',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './compra-realizada.component.html',
  styleUrl: './compra-realizada.component.css'
})
export class CompraRealizadaComponent {
  compra: any;
  id: string | null = "";
  constructor(
    private location: Location,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router // Inyectar ActivatedRoute

  ) {
    this.compra = [];
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id'); // Obtener el id de la URL
    if (this.id) {
      this.getOrden(this.id); // Llamar al método con el id
    }
  }

  public getOrden(id: string) {
    this.clienteService.getOrden(id).subscribe({
      next: (data) => {
        console.log(data);
        this.compra = data.respuesta;
      },
      error: (error) => {
        Swal.fire(error.respuesta)
        console.log(error);
      },
    });

  }

  public abrirQr(){
    this.router.navigate(['/qr-compra/'+this.id])
  }

  // Método para regresar a la página anterior
  regresar() {
    this.location.back();
  }
}
