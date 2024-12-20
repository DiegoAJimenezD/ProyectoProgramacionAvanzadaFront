import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../interfaces/mensaje-dto';
import { CrearEventoDTO } from '../interfaces/Evento/crear-evento-dto';
import { EditarEventoDTO } from '../interfaces/Evento/editar-evento-dto';
import { CrearCuponDTO } from '../interfaces/Cupon/crear-cupon-dto';
import { EditarCuponDTO } from '../interfaces/Cupon/editar-cupon-dto';
import { TokenService } from './token.service';
import { ResponderPqrDTO } from '../interfaces/Pqrs/responder-pqrs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {


  private adminURL = "http://localhost:8080/api/administrador";


  constructor(private http: HttpClient, private tokenService: TokenService) { }
 
 
  public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/evento/crear`, crearEventoDTO);
  }
 
 
  public actualizarEvento(editarEventoDTO: EditarEventoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/evento/editar`, editarEventoDTO);
  }
 
 
  public obtenerEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener/${id}`);
  }
 
 
  public eliminarEvento(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/evento/eliminar/${id}`);
  }
 
 
  public listarEventosAdmin(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/evento/listar-todo`);
  }
 
 
  public subirImagen(imagen: FormData): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/imagen/subir`, imagen);
  }

  public crearCupon(crearCuponDTO: CrearCuponDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/cupon/crear`, crearCuponDTO);
  }
 
 
  public actualizarCupon(editarCuponDTO: EditarCuponDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/cupon/editar`, editarCuponDTO);
  }
 
 
  public obtenerCupon(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/obtener/${id}`);
  }
 
 
  public eliminarCupon(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/cupon/eliminar/${id}`);
  }
  

   
  public listarTipoCupones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/obtener-tipos`);
  }

  public listarTipoEventos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener-tipos`);
  }

  public listarCupones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/listar-todo`);
  }


  public listarPqrs(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/pqr/listar-todo`);
  }

  public getPqr(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/pqr/obtener/${id}`);
  }

  public responderPqr(responderPqrDTO: ResponderPqrDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/pqr/responder`, responderPqrDTO);
  }
}
