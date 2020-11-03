import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { VuelosComponent } from './vuelos/vuelos.component';
import { VuelosComprarComponent } from './vuelos-comprar/vuelos-comprar.component';



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
    VuelosComponent,
    VuelosComprarComponent
   ],
  imports: [
    BrowserModule,
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



