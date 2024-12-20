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
import { PqrsComponent } from './componentes/pqrs/pqrs.component';
import { EditarPerfilComponent } from './componentes/editar-perfil/editar-perfil.component';
import { ActivarCuentaComponent } from './componentes/activar-cuenta/activar-cuenta.component';
import { LoginGuard } from './servicios/guards/permiso.service';
import { RolesGuard } from './servicios/guards/roles.service';

import { ListarPqrsComponent } from './componentes/listar-pqrs/listar-pqrs.component';

import { PagoResultadosComponent } from './componentes/pago-resultados/pago-resultados.component';
import { ResponderPqrsComponent } from './componentes/responder-pqrs/responder-pqrs.component';



export const routes: Routes = [

   { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
   { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
   { path: 'activar-cuenta', component: ActivarCuentaComponent, canActivate: [LoginGuard]},
   { path: 'cambio', component: CambioComponent, canActivate: [LoginGuard] },
   { path: 'recuperacion', component: RecuperacionComponent, canActivate: [LoginGuard] },

   { path: 'administrador', component: AdministradorComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'crear-eventos', component: CrearEventosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'listar-eventos', component: ListarEventosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'listar-pqrs', component: ListarPqrsComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'reportes-admin', component: ReportesAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'crear-cupones', component: CrearCuponesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'editar-cupones/:id', component: EditarCuponesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'editar-eventos/:id', component: EditarEventosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: 'listar-cupones', component: ListarCuponesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },

   { path: 'info-evento/:id', component: InfoEventoComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   { path: 'mis-compras', component: MisComprasComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   { path: 'compra-realizada/:id', component: CompraRealizadaComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   { path: 'qr-compra/:id', component: QrCompraComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   { path: 'realizar-compra/:id', component: RealizarCompraComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   { path: 'carrito', component: CarritoComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   { path: 'perfil', component: PerfilComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   { path: 'pago/:estado', component: PagoResultadosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
   
   { path: 'editar-perfil/:id', component: EditarPerfilComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE","ADMINISTRADOR"] } },

   { path: 'pqrs', component: PqrsComponent },
   { path: '', component: InicioComponent },
   { path: 'listar-pqrs', component: ListarPqrsComponent },
   { path: 'responder-pqrs/:id', component: ResponderPqrsComponent },
   { path: 'soporte', component: SoporteComponent },
   { path: "**", pathMatch: "full", redirectTo: "" },
];
