import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public contador: number = 0;
  public cont: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  // Methods with firebase
  async onLogin() {
    const { email, password } = this.loginForm.value;

    const user = await this.authService.login(email, password);
    if (user && user.user.emailVerified) {
      Swal.fire({
        icon: 'success',
        title: 'Yes!',
        text: 'Inicio de sesión exitoso!',
      })
      localStorage.setItem('rs', '4')
      var date = new Date();
      const log = {
        id_usuario: 'Email_Firebase',
        name_usuario: 'Usuario de firebase',
        status: 'Login Exitoso',
        metodo_inicio: 'Correo Electronico Firebase',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ,
          intentos: this.contador
      }

      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        if (response) {
          console.log('Log creado', response)
        }
      }, err => {
        console.log(err)
      })
      localStorage.setItem('isLog', '1')
      this.router.navigate(['/home']);
    } else if (user) {
      this.router.navigate(['/verification-email'])
    } else {
      console.log('Error de sesión firebase')

      if (this.contador > 1) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Demasiados intentos de inicio de sesión. Espera 1 min para volver intentarlo!',
          timer: 60000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        if(this.contador > 4){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Demasiados intentos de inicio de sesión. No podrás iniciar sesión!',
            timer: 86400,
            showConfirmButton: false,
            timerProgressBar: true,
          });
        
          this.cont = false;
        }

      }else{
        this.contador = this.contador + 1;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email o contraseña incorrectos!',
        })
      }


      var date = new Date();
      const log = {
        id_usuario: 'Error_firebase',
        name_usuario: 'Usuario firebase',
        status: 'Login Fallido',
        metodo_inicio: 'Correo Electronico Firebase',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() ,
        intentos: this.contador
      }
      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        if (response) {
          console.log('Log creado', response)
        }
      }, err => {
        console.log(err)
      })



      // this.contador = this.contador + 1;
      // console.log("contador " + this.contador)
    }
  }

  //login con la api
  async onLoginApi(loginForm: any) {
     await this.authService.ApiLogin(loginForm).subscribe(async response => {
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Yes!',
          text: 'Inicio de sesión exitoso!',
        })

        localStorage.setItem('id_user', response.user.id)
        localStorage.setItem('token', response.token)
        localStorage.setItem('isLog', '1')
        localStorage.setItem('rol', response.user.roll)
        localStorage.setItem('usuario', response.user.email)

        var date = new Date();
        const log = {
          id_usuario: localStorage.getItem('id_user'),
          name_usuario: response.user.email,
          status: 'Login Exitoso',
          metodo_inicio: 'Correo Electronico',
          hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
            + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
          roll: localStorage.getItem('rol'),
          actividad: "navegación"
        }

        //envia a el log
        await this.authService.ApiSetLog(log).subscribe(response => {
          if (response) {
            console.log('Log creado', response)
          }
        }, err => {
          console.log(err)
        })

        this.router.navigate(['/home']);      //Rederidige al inicio
        this.ngOnInit();
      }
    }, err => {
      console.log('Error de sesión')
      if (this.contador > 1) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Demasiados intentos de inicio de sesión. Espera 1 min para volver intentarlo!',
          timer: 60000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        this.contador = this.contador + 1;
        if(this.contador > 4){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Demasiados intentos de inicio de sesión. No podrás iniciar sesión!',
            timer: 86400,
            showConfirmButton: false,
            timerProgressBar: true,
          }); 

          const correo = {
            email : loginForm.email
          }

          this.authService.sendEmail(correo).subscribe(response => {
            // if (response) {
            //   console.log('email enviado',)
            // }
          }, err => {
            console.log(err)
          })

          this.cont = false;
        }
      }else{
        this.contador = this.contador + 1;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email o contraseña incorrectos!',
        })
      }


      var date = new Date();
      const log = {
        id_usuario: 'Error',
        name_usuario: loginForm.email,
        status: 'Login Fallido',
        metodo_inicio: 'Correo Electronico',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }

      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        // if (response) {
        //   console.log('Log creado', response)
        // }
      }, err => {
        console.log(err)
      })
    })



    console.log("contador " + this.contador)

  }


  async onFacebook() {
    try {
      await this.authService.authFacebook();
      localStorage.setItem('rs', '1')
      Swal.fire({
        icon: 'success',
        title: 'Yes!',
        text: 'Inicio de sesión por facebook exitoso!',
      })

      var date = new Date();

      const log = {
        id_usuario: 'Facebook',
        name_usuario: 'Usuario de Facebook',
        status: 'Login Facebook Exitoso',
        metodo_inicio: 'Facebook',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        // if (response) {
        //   console.log('Log creado', response)
        // }
      }, err => {
        console.log(err)
      })
      localStorage.setItem('isLog', '1')
      this.router.navigate(['/home'])
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error, vuelve a intentarlo!',
      })

      var date = new Date();
      const log = {
        id_usuario: 'Error',
        name_usuario: 'Unknown',
        status: 'Login Facebook Fallido',
        metodo_inicio: 'Facebook',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        // if (response) {
        //   console.log('Log creado', response)
        // }
      }, err => {
        console.log(err)
      })
      console.log(error)
    }
  }

  async onGoogle() {
    localStorage.setItem('rs', '2')
    try {
      await this.authService.authGoogle();
      Swal.fire({
        icon: 'success',
        title: 'Yes!',
        text: 'Inicio de sesión exitoso!',
      })

      var date = new Date();

      const log = {
        id_usuario: 'Google',
        name_usuario: 'Usuario de google',
        status: 'Login Google Exitoso',
        metodo_inicio: 'Google',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        // if (response) {
        //   console.log('Log creado', response)
        // }
      }, err => {
        console.log(err)
      })
      localStorage.setItem('isLog', '1')
      this.router.navigate(['/home'])
    } catch (error) {
      var date = new Date();
      const log = {
        id_usuario: 'Error',
        name_usuario: 'Unknown',
        status: 'Login google Fallido',
        metodo_inicio: 'Google',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        // if (response) {
        //   console.log('Log creado', response)
        // }
      }, err => {
        console.log(err)
      })
      console.log(error)
    }
  }

  async onGitHub() {
    localStorage.setItem('rs', '3')
    try {
      await this.authService.authGit();
      Swal.fire({
        icon: 'success',
        title: 'Yes!',
        text: 'Inicio de sesión exitoso!',
      })
      var date = new Date();

      const log = {
        id_usuario: 'Github',
        name_usuario: 'Usuario de github',
        status: 'Login Github Exitoso',
        metodo_inicio: 'Github',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        // if (response) {
        //   console.log('Log creado', response)
        // }
      }, err => {
        console.log(err)
      })
      localStorage.setItem('isLog', '1')
      this.router.navigate(['/home'])
    } catch (error) {
      var date = new Date();
      const log = {
        id_usuario: 'Error',
        name_usuario: 'Unknown',
        status: 'Login github Fallido',
        metodo_inicio: 'Github',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        // if (response) {
        //   console.log('Log creado', response)
        // }
      }, err => {
        console.log(err)
      })
      console.log(error)
    }
  }

}
