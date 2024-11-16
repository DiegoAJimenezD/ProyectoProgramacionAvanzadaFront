import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../servicios/auth/auth.service';
import { TokenService } from '../../../servicios/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nombre: string | null = null;
  isLogged = false;

  constructor(private tokenService: TokenService) {
    this.tokenService.nombreUsuario$.subscribe((nombre) => {
      this.isLogged = this.tokenService.isLogged();
      if(this.isLogged){
        this.nombre = this.tokenService.getNombre();
      }
    });

  }

  public logout() {
    this.tokenService.logout();
  }
}
