import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = "AuthToken";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  private nombreUsuarioSource = new BehaviorSubject<string | null>(null);

  nombreUsuario$ = this.nombreUsuarioSource.asObservable();

  setNombreUsuario(nombre: string | null) {
    this.nombreUsuarioSource.next(nombre);
  }

  public setToken(tokesessionStoragen: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, tokesessionStoragen);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public logout() {
    window.sessionStorage.clear();
    this.setNombreUsuario(null);
    this.router.navigate(["/login"]);
  }

  private decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  public getIDCuenta(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.id;
    }
    return "";
  }


  public getRol(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol;
    }
    return "";
  }

  public getNombre(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.nombre;
    }
    return "";
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.email;
    }
    return "";
  }

  public login(token: string) {
    this.setToken(token);
    this.setNombreUsuario(this.getNombre());
    const rol = this.getRol();
    let destino = rol == "ADMINISTRADOR" ? "/administrador" : "/inicio";
    this.router.navigate([destino]);
  }

}
