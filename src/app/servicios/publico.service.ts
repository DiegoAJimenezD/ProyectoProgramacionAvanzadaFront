import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../interfaces/mensaje-dto';
import { HttpClient } from '@angular/common/http';
import { FiltroEventoDTO } from '../interfaces/Evento/filtro-evento-dto';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {
  private publicoURL = "http://localhost:8080/api/evento";


  constructor(private http: HttpClient) { }
 
 
  public listarTipos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/obtener-tipos`);
  }
 
 
  public listarCiudades(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/obtener-ciudades`);
  }
 
 
  public listarEventos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-todo`);
  }
 
  public filterEvents(filtroEventoDTO: FiltroEventoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.publicoURL}/filtrar`, filtroEventoDTO);
  }
 
  public obtenerEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/obtener/${id}`);
  }
 
}
