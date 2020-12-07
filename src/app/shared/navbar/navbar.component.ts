import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})


export class NavbarComponent implements OnInit {

  public isLogged = false;
  public roll: any;
  public user$: Observable<any> = this.authService.afAuth.user;
  public user: any;


  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
    if(localStorage.getItem('id_user')){
      this.authService.ApiGetById(localStorage.getItem('id_user')).subscribe(response => {
        if (response) {
          this.isLogged = true;
          this.user = response.user.email;
          this.roll = response.user.roll;
        }
      })
    }
  }

  async onOut() {
    try {
      Swal.fire({
        icon: 'success',
        title: 'Yes!',
        text: 'cierre de sesión exitoso!',
      })

      let usr = localStorage.getItem('rs')
     
      if(usr === "1"){
        usr = 'Facebook'
      }

      if(usr === "2"){
        usr = 'Google'
      }

      if(usr === "3"){
        usr = 'Github'
      }

      if(usr === "4"){
        usr = 'Firebase'
      }

      var date = new Date();

      const log = {
        id_usuario: usr,
        name_usuario: 'Usuario de '+usr,
        status: 'Logout de ' + usr + ' Exitoso',
        metodo_inicio: usr,
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '---Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }
      
      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        // if (response) {
        //   console.log('Log actualizado', response)
        // }
      }, err => {
        console.log(err)
      })

      // localStorage.removeItem('rs')
      // localStorage.removeItem('isLog')
      // localStorage.removeItem('id_user')
      // localStorage.removeItem('token')
      // localStorage.removeItem('isLog')
      // localStorage.removeItem('rol')
      // localStorage.removeItem('usuario')
      localStorage.clear()
      this.authService.logout();
      this.router.navigate(['/home']);

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error!',
      })
    }
  }

  onLogOut() {
    Swal.fire({
      icon: 'success',
      title: 'Yes!',
      text: 'cierre de sesión exitoso!',
    })

    var date = new Date();
    const log = {
      id_usuario: localStorage.getItem('id_user'),
      name_usuario: this.user,
      status: 'Logout Exitoso',
      metodo_inicio: 'Correo Electronico',
      hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
        + '---Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }

    //envia a el log
    this.authService.ApiSetLog(log).subscribe(response => {
      // if (response) {
      //   console.log('Log actualizado', response)
      // }
    }, err => {
      console.log(err)
    })

    this.isLogged = false;
    localStorage.clear()
    this.router.navigate(['/home']);
  }

}
