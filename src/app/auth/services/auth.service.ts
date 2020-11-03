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

  URL: string = "http://127.0.0.1:4000";
	token;
  public id;
  
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });


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
      let headerss = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
      return this.http.get(this.URL + '/user/' + id, {headers: headerss })
   
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
