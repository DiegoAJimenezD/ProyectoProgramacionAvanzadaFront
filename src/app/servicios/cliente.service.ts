import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../interfaces/mensaje-dto';
import { AgregarItemCarritoDTO } from '../interfaces/Carrito/agregar-item-carrito-dto';
import { CrearCarritoDTO } from '../interfaces/Carrito/crear-carrito-dto';
import { EliminarItemCarritoDTO } from '../interfaces/Carrito/eliminar-item-carrito-dto';
import { CrearOrdenDTO } from '../interfaces/Orden/crear-orden-dto';
import { EditarItemCarritoDTO } from '../interfaces/Carrito/editar-item-carrito-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private adminURL = "https://backend-m334.onrender.com/api/cliente";

  constructor(private http: HttpClient) { }
  

  // Orden
  public listarHistorialCompras(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/orden/listar-ordenes/${id}`);
  }
  public getOrden(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/orden/informacion/${id}`);
  }
  public getQr(id: string | null){
    return `${this.adminURL}/orden/qr/${id}`;
  }
  public crearOrden(crearOrdenDTO: CrearOrdenDTO){
    return this.http.post<MensajeDTO>(`${this.adminURL}/orden/crear`, crearOrdenDTO);
  }
  public realizarPago(idOrden: string){
    return this.http.post<MensajeDTO>(`${this.adminURL}/orden/realizar-pago`, {"idOrden": idOrden});
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
  public editarItemCarrito(editarItemCarritoDTO: EditarItemCarritoDTO){
    return this.http.put<MensajeDTO>(`${this.adminURL}/carrito/editar-item`,editarItemCarritoDTO);
  }
   public listarCarrito(id: string){
    return this.http.get<MensajeDTO>(`${this.adminURL}/carrito/obtener/${id}`);
  }

}
