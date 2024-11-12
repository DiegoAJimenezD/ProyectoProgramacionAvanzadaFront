import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearCuentaDTO } from '../../interfaces/Cuenta/crear-cuenta-dto';
import { MensajeDTO } from '../../interfaces/mensaje-dto';
import { LoginDTO } from '../../interfaces/Cuenta/login-dto';
import { ActivarCuentaDTO } from '../../interfaces/Cuenta/activar-cuenta-dto';


@Injectable({
 providedIn: 'root'
})

export class AuthService {

  private authURL = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }

  public crearCuenta(cuentaDTO: CrearCuentaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/crear-cuenta`, cuentaDTO);
   }
      
   public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
   }

   public activarCuenta(activarCuenta: ActivarCuentaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/activar-cuenta`, activarCuenta);
   }
   
}
