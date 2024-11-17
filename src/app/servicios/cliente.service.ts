import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../interfaces/mensaje-dto';
import { TokenService } from './token.service';
import { AgregarItemCarritoDTO } from '../interfaces/Carrito/agregar-item-carrito-dto';
import { CrearCarritoDTO } from '../interfaces/Carrito/crear-carrito-dto';
import { EliminarItemCarritoDTO } from '../interfaces/Carrito/eliminar-item-carrito-dto';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private adminURL = "http://localhost:8080/api/cliente";

  constructor(private http: HttpClient, private tokenService: TokenService) { }
  

  // Orden
  public listarHistorialCompras(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/orden/listar-ordenes/${id}`);
  }
  public getOrden(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/orden/informacion/${id}`);
  }

  public getCuenta(){
    let id = this.tokenService.getIDCuenta();
    return this.http.get<MensajeDTO>(`${this.adminURL}/cuenta/obtener/${id}`);
  }
  public getQr(id: string | null){
    return `${this.adminURL}/orden/qr/${id}`;
  }
  // Carrito
  public crearCarrito(crearCarritoDTO: CrearCarritoDTO){
    return this.http.post<MensajeDTO>(`${this.adminURL}/carrito/crear`, crearCarritoDTO);
  }
  public agregarCarrito(agregarItemCarritoDTO: AgregarItemCarritoDTO){
    return this.http.post<MensajeDTO>(`${this.adminURL}/carrito/agregar-item`,agregarItemCarritoDTO);
  }
  public eliminarItemCarrito(eliminarItemCarritoDTO: EliminarItemCarritoDTO){
    return this.http.delete<MensajeDTO>(`${this.adminURL}/carrito/eliminar-item`,{"body": eliminarItemCarritoDTO});
  }
   public listarCarrito(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/carrito/obtener/${id}`);
  }

}
