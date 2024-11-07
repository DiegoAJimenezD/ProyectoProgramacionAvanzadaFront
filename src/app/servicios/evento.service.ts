import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../interfaces/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private authURL = "http://localhost:8080/api/evento";

  constructor(private http: HttpClient) { }

  public showEvents(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar-todo`);
  }

  public getEvent(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/obtener/${id}`);
   } 
}
