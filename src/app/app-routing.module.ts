import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { RegistroActividadesComponent } from './registro-actividades/registro-actividades.component';
import { ListaVuelosComponent } from './vuelos/lista-vuelos/lista-vuelos.component';
import { RegistrarVueloComponent } from './vuelos/registrar-vuelo/registrar-vuelo.component';
import { VuelosComprarComponent } from './vuelos/vuelos-comprar/vuelos-comprar.component';



const routes: Routes = [
  {
    path:'',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)},
  { path: 'password', loadChildren: () => import('./auth/password/password.module').then(m => m.PasswordModule)},
  {
    path:'lista-vuelos',
    component: ListaVuelosComponent
  },
  {
    path:'comprar-vuelo',
    component: VuelosComprarComponent
  },
  {
    path: 'registrar-vuelo',
    component: RegistrarVueloComponent
  },
  {
    path: 'verification-email',
    component: SendEmailComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'Politicas',
    component: PoliticasComponent
  },
  {
    path: 'registro_actividades',
    component: RegistroActividadesComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
