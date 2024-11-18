   export interface EditarEventoDTO {
    id: string;
    nombre: string;
    descripcion: string;
    tipoEvento: string;
    direccion: string;
    ciudad: string;
    fecha: string; // Puede ser Date o string, dependiendo de la estructura en el backend
    localidades: LocalidadDTO[];
    imagenPortada?: string;
    imagenLocalidades?: string;
  }

  interface LocalidadDTO {
    id: string;
    nombre: string;
    capacidadMaxima: number;
    precio: number;
  }