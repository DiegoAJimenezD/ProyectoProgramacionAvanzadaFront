import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FiltroEventoDTO } from '../../interfaces/Evento/filtro-evento-dto';
import { PublicoService } from '../../servicios/publico.service';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCarritoDTO } from '../../interfaces/Carrito/crear-carrito-dto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {
  formfilterEvents!: FormGroup;
  items: any[] = [];
  ciudades: any[] = [];
  tipos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private publicoService: PublicoService,
    private clienteService: ClienteService,
    private tokenService: TokenService,
    private router: Router,
  ) {
    this.showEvents();
    this.crearFormulario();
    this.listarTipos();
    this.listarCiudades();
  }

  private crearFormulario() {
    this.formfilterEvents = this.formBuilder.group({
      nombre: [''],
      tipo: [''],
      ciudad: ['']
    },
    );
  }

  public showEvents() {
    this.publicoService.listarEventos().subscribe({
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

  public filterEvents() {
    const filtroEventoDTO = this.formfilterEvents.value as FiltroEventoDTO;
    console.log(filtroEventoDTO);
    this.publicoService.filterEvents(filtroEventoDTO).subscribe({
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

  public openPage(id: string) {
    if (this.tokenService.isLogged()) {
      var carrito = {'idUsuario': this.tokenService.getIDCuenta()} as CrearCarritoDTO;
      this.clienteService.crearCarrito(carrito).subscribe({
        next: (data) => {
          console.log(data.respuesta);
          this.router.navigate(['/info-evento/' + id]);
        },
        error: (error) => {
          if(error.error.respuesta == "El carrito ya existe"){
            this.router.navigate(['/info-evento/' + id]);
          }else{
            console.error(error);
          }
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  public listarTipos() {
    this.publicoService.listarTipos().subscribe({
      next: (data) => {
        this.tipos = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public listarCiudades() {
    this.publicoService.listarCiudades().subscribe({
      next: (data) => {
        this.ciudades = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }


}
