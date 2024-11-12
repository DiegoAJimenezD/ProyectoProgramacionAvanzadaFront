import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { PublicoService } from '../../servicios/publico.service';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CrearEventoDTO } from '../../interfaces/Evento/crear-evento-dto';


@Component({
  selector: 'app-crear-eventos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './crear-eventos.component.html',
  styleUrl: './crear-eventos.component.css'
})

export class CrearEventosComponent {
  imagenPortada?: File;
  imagenLocalidades?: File;
  ciudades: any[] = [];
  tipos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private publicoService: PublicoService,
    private adminService: AdministradorService) {
    this.crearFormulario();
    this.listarTipos();
    this.listarCiudades();
  }

  crearEventoForm!: FormGroup;

  private crearFormulario() {
    this.crearEventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipoEvento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      localidades: this.formBuilder.array([]),
      imagenPortada: ['', [Validators.required]],
      imagenLocalidades: ['', [Validators.required]]
    });
  }

  // Acceso rápido al FormArray de localidades
  get localidades(): FormArray {
    return this.crearEventoForm.get('localidades') as FormArray;
  }

  // Método para crear una nueva localidad
  nuevaLocalidad(): FormGroup {
    return this.formBuilder.group({
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Método para agregar una nueva localidad
  agregarLocalidad() {
    this.localidades.push(this.nuevaLocalidad());
  }

  // Método para eliminar una localidad por índice
  eliminarLocalidad(index: number) {
    if (this.localidades.length > 1) {
      this.localidades.removeAt(index);
    } else {
      // Aquí puedes mostrar un mensaje o realizar otra acción si intentan eliminar la última localidad
      alert('Debe haber al menos una localidad.');
    }
  }

  public onFileChange(event: any, tipo: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      tipo == 'localidades' ? (this.imagenLocalidades = file) : (this.imagenPortada = file);
      tipo == 'portada' ? (this.imagenPortada = file) : (this.imagenPortada = file);

    }
  }

  public crearEvento() {
    console.log(this.crearEventoForm.value);

    const crearEventoDTO = this.crearEventoForm.value as CrearEventoDTO;

    this.adminService.crearEvento(crearEventoDTO).subscribe({
      next: () => {
        Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
      },
      error: error => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });

  }

  // Método para regresar a la página anterior
  regresar() {
    this.location.back();
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

  public subirImagen(tipo: string) {
    const formData = new FormData();
    const imagen = tipo == 'portada' ? this.imagenPortada : this.imagenLocalidades;
    const formControl = tipo == 'portada' ? 'imagenPortada' : 'imagenLocalidades';

    formData.append('imagen', imagen!);

    this.adminService.subirImagen(formData).subscribe({
      next: (data) => {
        this.crearEventoForm.get(formControl)?.setValue(data.respuesta);
        Swal.fire("Exito!", "Se ha subido la imagen.", "success");
      },
      error: (error) => {
        Swal.fire("Error!", error.error.respuesta, "error");
      }
    });

  }


}

