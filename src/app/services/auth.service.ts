import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators'
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()

export class AuthService {

  public user: User;
  
  constructor(public afAuth: AngularFireAuth, private http: HttpClient) { }

  URL: string = "https://aeroline.herokuapp.com";
	token: any;
  public id: any;
  email: any;

 //M E T H O D S -  W I T H  -  A P I

  //Login
  ApiLogin(body: any): Observable<any> {
    try {
      return this.http.post<any>(this.URL + '/login', body);
    } catch (error) {
      console.log(error)
    }
    
  }

  //Registro con API
   Apiregistro(body: any): Observable<any>{
    try {
      return this.http.post<any>(this.URL + '/register', body)
    } catch (error) {
      console.log(error)
    }
  }

  //traer usuario por id
  ApiGetById(id: String): Observable<any>{
    try {
      this.token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
      return this.http.get<any>(this.URL + '/user/' + id, {headers: headers })
   
    } catch (error) {
      console.log(error)
    }
  }


  //registro vuelos
  ApiSetVuelo(body: any): Observable<any>{
    try {
      this.token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
      return this.http.post<any>(this.URL + '/vuelos' , body, {headers: headers })
    } catch (error) {
      console.log(error)
    }
  }

  ApiGetVuelo(): Observable<any>{
    try {
      this.token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
      return this.http.get<any>(this.URL + '/vuelos')
    } catch (error) {
      console.log(error)
    }
  }

  ApiGetVueloById(id: string): Observable<any>{
    try {
      this.token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
      return this.http.get<any>(this.URL + '/vuelos/' + id, {headers: headers })
    } catch (error) {
      console.log(error)
    }
  }

  ApiUpdateVueloById(id: string, body: any): Observable<any>{
    try {
      this.token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
      return this.http.put<any>(this.URL + '/vuelos/' + id, body, {headers: headers })
    } catch (error) {
      console.log(error)
    }
  }

  ApiDeleteVueloById(id: string): Observable<any>{
    try {
      this.token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
      return this.http.delete<any>(this.URL + '/vuelos/' + id, {headers: headers })
    } catch (error) {
      console.log(error)
    }
  }

  //archivos logs
  ApiSetLog(body: any): Observable<any>{
    try {
      return this.http.post<any>(this.URL + '/logs', body)
    } catch (error) {
      console.log(error)
    }
  }
  //traer por id los logs
  ApiUpdateLog(id: String , body: any): Observable<any>{
    try {
      return this.http.put<any>(this.URL + '/logs/' + id, body)
    } catch (error) {
      console.log(error)
    }
  }

  //enviar correos
  sendEmail(body: any): Observable<any>{   
    try {
       return this.http.post<any>( this.URL + '/email', body)
    } catch (error) {
      console.log(error)
    }
  }

  sendEmailRegistro(body: any): Observable<any>{
    try {
      return this.http.post<any>( this.URL +'/email_registro', body)
   } catch (error) {
     console.log(error)
   }
  }

  //traer logs
  getLogs(){
    try {
      return this.http.get(this.URL + '/logs')
    } catch (error) {
      console.log(error)
    }
  }

  //origen y destino de vuelos
  getOrigenes(){
    try {
      return this.http.get(this.URL + '/origen')
    } catch (error) {
      console.log(error)
    }
  }

  getDestino(){
    try {
      return this.http.get(this.URL + '/destino')
    } catch (error) {
      console.log(error)
    }
  }

  getOrigenID(id: string):  Observable<any>{
    try {
      return this.http.get<any>(this.URL + '/origen/' + id)
    } catch (error) {
      console.log(error)
    }
  }

  getDestinoID(id: string): Observable<any>{
    try {
      return this.http.get<any>(this.URL + '/destino/' + id)
    } catch (error) {
      console.log(error)
    }
  }

  //comprar
  setPagoOpenPay(body: any): Observable<any>{
    try {
      this.token = localStorage.getItem('token');
      let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
      return this.http.post<any>(this.URL + '/pagar' ,body, {headers: headers })
   } catch (error) {
     console.log(error)
   }
  }


  //M E T H O D S -  W I T H  -  F I R E B A SE

  //Envia confirmación email firebase
  async sendEmailVerification(): Promise<void>{
    return await (await this.afAuth.currentUser).sendEmailVerification();
  }

  //Envia contraseña firebase
  async sendPassword(email: string): Promise<void>{
    try {
      return await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error)
    }
    
  }

  // Login con firebase
  async login(email:string, password:string){
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error)
    }

  }

  //registro con firebase
  async register(email: string, password: string){
    try {
          const result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );   
    this.sendEmailVerification();
     return result;
    } catch (error) {
      console.log(error)
    }
  }

  //Logout con firebase 
  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error)
    }
  }



  //Traer el usuario con firebase
  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }


  //F A C E B O O K 
  async authFacebook(){
    return await this.afAuth.signInWithPopup(new auth.FacebookAuthProvider);

  }

  //T W I T T E R 
  async authTwitter(){


  }

  //G O O G L E
  async authGoogle(){
    return await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider);
    
  }

  //G I T H U B
  async authGit(){
    return await this.afAuth.signInWithPopup(new auth.GithubAuthProvider);
  }


  
}
