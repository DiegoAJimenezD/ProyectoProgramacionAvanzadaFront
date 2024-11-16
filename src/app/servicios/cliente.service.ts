import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../interfaces/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private adminURL = "http://localhost:8080/api/cliente";

  constructor(private http: HttpClient) { }
  
  public listarHistorialCompras(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/orden/listar-ordenes/${id}`);
  }

  public getOrden(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/orden/listar-ordenes/${id}`);
  }
}
