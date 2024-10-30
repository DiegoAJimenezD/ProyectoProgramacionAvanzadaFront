import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { CambioComponent } from './componentes/cambio/cambio.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { CompraRealizadaComponent } from './componentes/compra-realizada/compra-realizada.component';
import { CrearCuponesComponent } from './componentes/crear-cupones/crear-cupones.component';
import { CrearEventosComponent } from './componentes/crear-eventos/crear-eventos.component';
import { EditarCuponesComponent } from './componentes/editar-cupones/editar-cupones.component';
import { EditarEventosComponent } from './componentes/editar-eventos/editar-eventos.component';
import { InfoEventoComponent } from './componentes/info-evento/info-evento.component';
import { ListarCuponesComponent } from './componentes/listar-cupones/listar-cupones.component';
import { ListarEventosComponent } from './componentes/listar-eventos/listar-eventos.component';
import { MisComprasComponent } from './componentes/mis-compras/mis-compras.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { QrCompraComponent } from './componentes/qr-compra/qr-compra.component';
import { RealizarCompraComponent } from './componentes/realizar-compra/realizar-compra.component';
import { RecuperacionComponent } from './componentes/recuperacion/recuperacion.component';
import { ReportesAdminComponent } from './componentes/reportes-admin/reportes-admin.component';
import { SoporteComponent } from './componentes/soporte/soporte.component';


export const routes: Routes = [
   { path: 'administrador', component: AdministradorComponent },
   { path: 'cambio', component: CambioComponent },
   { path: 'carrito', component: CarritoComponent },
   { path: 'compra-realizada', component: CompraRealizadaComponent },
   { path: 'crear-cupones', component: CrearCuponesComponent },
   { path: 'crear-eventos', component: CrearEventosComponent },
   { path: 'editar-cupones', component: EditarCuponesComponent },
   { path: 'editar-eventos', component: EditarEventosComponent },
   { path: 'info-evento', component: InfoEventoComponent },
   { path: '', component: InicioComponent },
   { path: 'listar-cupones', component: ListarCuponesComponent },
   { path: 'listar-eventos', component: ListarEventosComponent },
   { path: 'login', component: LoginComponent },
   { path: 'mis-compras', component: MisComprasComponent },
   { path: 'perfil', component: PerfilComponent },
   { path: 'qr-compra', component: QrCompraComponent },
   { path: 'realizar-compra', component: RealizarCompraComponent },
   { path: 'recuperacion', component: RecuperacionComponent },
   { path: 'registro', component: RegistroComponent },
   { path: 'reportes-admin', component: ReportesAdminComponent },
   { path: 'soporte', component: SoporteComponent },
   { path: "**", pathMatch: "full", redirectTo: "" }
];
