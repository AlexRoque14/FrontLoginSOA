import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

//import firebase from "firebase/app";
import * as firebase from "firebase";

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaVuelosComponent } from './vuelos/lista-vuelos/lista-vuelos.component';
import { RegistrarVueloComponent } from './vuelos/registrar-vuelo/registrar-vuelo.component';
import { VuelosComprarComponent } from './vuelos/vuelos-comprar/vuelos-comprar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { RegistroActividadesComponent } from './registro-actividades/registro-actividades.component';




var firebaseConfig = {
  apiKey: "AIzaSyCJD7bEgNhdTgyDuIMYZICzKUONNR5Qo-Q",
  authDomain: "authsoa.firebaseapp.com",
  databaseURL: "https://authsoa.firebaseio.com",
  projectId: "authsoa",
  storageBucket: "authsoa.appspot.com",
  messagingSenderId: "345373959921",
  appId: "1:345373959921:web:c320a81de18dae4cfd6b50",
  measurementId: "G-N2KCZ5F0E6"
};

firebase.initializeApp(firebaseConfig);
//firebase.analytics();

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SendEmailComponent,
    ListaVuelosComponent,
    RegistrarVueloComponent,
    VuelosComprarComponent,
    ContactoComponent,
    PoliticasComponent,
    RegistroActividadesComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), //iniatilize
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



