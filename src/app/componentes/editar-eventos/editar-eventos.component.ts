import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-crear-eventos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-eventos.component.html',
  styleUrl: './editar-eventos.component.css'
})
export class EditarEventosComponent {

  tiposDeEvento: string[];

  constructor(private formBuilder: FormBuilder) {
   this.editarFormulario();
   this.tiposDeEvento = ['Deporte', 'Concierto', 'Cultural', 'Moda', 'Belleza'];
  }

  editarEventoForm!: FormGroup;

  private editarFormulario() {
    this.editarEventoForm = this.formBuilder.group({
     nombre: ['', [Validators.required,]],
     descripcion: ['', [Validators.required]],
     tipo: ['', [Validators.required]],
     direccion: ['', [Validators.required]],
     ciudad: ['', [Validators.required]],
     fechaEvento: ['', [Validators.required]],
     localidades: this.formBuilder.array([]),
     imagenPortada: ['', [Validators.required]],
     imagenLocalidades: ['', [Validators.required]]
   });
  }




  // Acceso rápido al FormArray de localidades
  get localidades(): FormArray {
    return this.editarEventoForm.get('localidades') as FormArray;
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




  
  public onFileChange(event:any, tipo:string){
    if (event.target.files.length > 0) {
      const files = event.target.files;     
   
   
      switch(tipo){
        case 'localidades':
          this.editarEventoForm.get('imagenLocalidades')?.setValue(files[0]);
          break;
        case 'portada':
          this.editarEventoForm.get('imagenPortada')?.setValue(files[0]);
          break;
      }
    }
   }
   public editarEvento(){
    console.log(this.editarEventoForm.value);
   }
   
}

