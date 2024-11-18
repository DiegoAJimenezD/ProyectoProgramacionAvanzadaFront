import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../interfaces/Cuenta/login-dto';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  crearLogin!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.crearLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(7)]],
    },
    );
  }

  public iniciar() {
    const loginDTO = this.crearLogin.value as LoginDTO;

    this.authService.iniciarSesion(loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta.token);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta
        });
      },
    });
  }

  public abrirGoogle() {
    var url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://app-unieventos-frontend-uq.web.app/google/uri&response_type=code&client_id=377558172194-lcst36rbpvchue077eg9ouesip05ck8b.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline";
    window.location.href = url;
  }
}
