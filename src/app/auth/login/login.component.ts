import { Component, OnInit } from '@angular/core';
import {FormControl , FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from './../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('' , Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin(){
    console.log('Form->' , this.loginForm.value);
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authService.login(email , password);
      if(user && user.user.emailVerified) {
        Swal.fire({
          icon: 'success',
          title: 'Yes!',
          text: 'Inicio de sesión exitoso!',
        })
        this.router.navigate(['/home']);
      }else if(user){
        this.router.navigate(['/verification-email'])
      }else{
        this.router.navigate(['/register']);
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email o contraseña incorrectos!',
      })
      
    }
  }

  async onFacebook(){
    try {
      await this.authService.authFacebook();
      this.router.navigate(['/home'])
    } catch (error) {
      console.log(error)
    }
  }

  async onGoogle(){
    try {
      await this.authService.authGoogle();
      this.router.navigate(['/home'])
    } catch (error) {
      console.log(error)
    }
  }

  async onGitHub(){
    try {
      await this.authService.authGit();
      this.router.navigate(['/home'])
    } catch (error) {
      console.log(error)
    }
  }

}
