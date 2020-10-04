import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators'
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import * as firebase from 'firebase';


@Injectable()

export class AuthService {

  public user: User;
  constructor(public afAuth: AngularFireAuth) { }

  async sendEmailVerification(): Promise<void>{
    return await (await this.afAuth.currentUser).sendEmailVerification();
  }

  async sendPassword(email: string): Promise<void>{
    try {
      return await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error)
    }
    
  }

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

  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error)
    }
  }

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
