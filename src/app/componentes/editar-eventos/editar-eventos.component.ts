import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-editar-eventos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './editar-eventos.component.html',
  styleUrls: ['./editar-eventos.component.css']
})
export class EditarEventosComponent implements OnInit {
  editarEventoForm!: FormGroup;
  tiposDeEvento: any[] = [];
  evento: any = {};
  localidad: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdministradorService
  ) {}

  ngOnInit() {
    this.editarFormulario();
    this.listarEventosAdmin();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerEvento(id);
    } else {
      console.error('No se proporcionó un ID de evento válido');
      this.router.navigate(['/lista-eventos']); // Redirigir a la lista de eventos si no hay ID
    }
  }

  public listarEventosAdmin() {
    this.adminService.listarTipoEventos().subscribe({
      next: (data) => {
        this.tiposDeEvento = data.respuesta;
        console.log('Tipos de evento:', this.tiposDeEvento);
      },
      error: (error) => {
        console.error('Error al obtener tipos de eventos:', error);
        alert('No se pudieron cargar los tipos de eventos.');
      },
    });
  }

  public obtenerEvento(id: string): void {
    this.adminService.obtenerEvento(id).subscribe({
      next: (data) => {
        console.log('Evento obtenido:', data);
        this.evento = data.respuesta;
        this.actualizarFormulario();
      },
      error: (error) => {
        console.error('Error al obtener el evento:', error);
        alert('No se pudo obtener la información del evento.');
      }
    });
  }

  private actualizarFormulario() {
    this.editarEventoForm.patchValue({
      id: this.evento.id,
      nombre: this.evento.nombre,
      descripcion: this.evento.descripcion,
      tipoEvento: this.evento.tipoEvento,
      direccion: this.evento.direccion,
      ciudad: this.evento.ciudad,
      fecha: this.evento.fecha,
      imagenPortada: this.evento.imagenPortada,
      imagenLocalidades: this.evento.imagenLocalidades
    });

    // Limpiar y recargar las localidades
    this.localidades.clear();
    if (this.evento.localidades && this.evento.localidades.length > 0) {
      this.evento.localidades.forEach((localidad: any) => {
        this.agregarLocalidadExistente(localidad);
      });
    } else {
      this.agregarLocalidad(); // Agregar al menos una localidad vacía si no hay localidades
    }
  }

  private editarFormulario() {
    this.editarEventoForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipoEvento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      localidades: this.formBuilder.array([]),
      imagenPortada: [''],
      imagenLocalidades: ['']
    });
  }

  get localidades(): FormArray {
    return this.editarEventoForm.get('localidades') as FormArray;
  }

  agregarLocalidadExistente(localidad: any): void {
    const localidadForm = this.formBuilder.group({
      id: [localidad.id || ''],
      nombre: [localidad.nombre || '', Validators.required],  // Cambié 'nombreL' a 'nombre'
      cantidad: [localidad.cantidad || '', [Validators.required, Validators.min(1)]],
      precio: [localidad.precio || '', [Validators.required, Validators.min(0)]]
    });

    this.localidades.push(localidadForm);  // Agregar la localidad al FormArray
  }

  agregarLocalidad() {
    const nuevaLocalidad = this.formBuilder.group({
      nombre: ['', [Validators.required]],  // Cambié 'nombreL' a 'nombre'
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
    this.localidades.push(nuevaLocalidad);
  }

  eliminarLocalidad(index: number) {
    if (this.localidades.length > 1) {
      this.localidades.removeAt(index);
    } else {
      alert('Debe haber al menos una localidad.');
    }
  }

  public onFileChange(event: any, tipo: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editarEventoForm.patchValue({
        [tipo === 'localidades' ? 'imagenLocalidades' : 'imagenPortada']: file
      });
    }
  }

  public editarEvento() {
    if (this.editarEventoForm.valid) {
      const eventoEditado = this.editarEventoForm.value;
      this.adminService.actualizarEvento(eventoEditado).subscribe({
        next: (response) => {
          console.log('Evento editado con éxito:', response);
          alert('Evento editado correctamente');
          this.router.navigate(['/lista-eventos']); // Redirigir a la lista de eventos
        },
        error: (error) => {
          console.error('Error al editar el evento:', error);
          alert('Error al editar el evento. Por favor, intente nuevamente.');
        }
      });
    } else {
      alert('Por favor, complete todos los campos requeridos correctamente.');
    }
  }

  regresar() {
    this.location.back();
  }
}
