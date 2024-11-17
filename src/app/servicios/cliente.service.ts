import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../interfaces/mensaje-dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private adminURL = "http://localhost:8080/api/cliente";

  constructor(private http: HttpClient, private tokenService: TokenService) { }
  
  public listarHistorialCompras(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/orden/listar-ordenes/${id}`);
  }

  public getOrden(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/orden/listar-ordenes/${id}`);
  }

  public getCuenta(){
    let id = this.tokenService.getIDCuenta();
    return this.http.get<MensajeDTO>(`${this.adminURL}/cuenta/obtener/${id}`);
  }

}
