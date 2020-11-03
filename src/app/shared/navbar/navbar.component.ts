import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})


export class NavbarComponent implements OnInit {

  public isLogged = false;


  public user$: Observable<any> = this.authService.afAuth.user;

  public user2: any;
  public user: any;

  constructor(private authService: AuthService , private router: Router) { }

 ngOnInit() {
    this.validUser();
  }

  validUser(){
      this.authService.ApiGetById(localStorage.getItem('id_user')).subscribe(response =>{
        if(response){
          this.isLogged = true;
          this.user = response.user.email;
        }
      })
  }


  async onOut(){
    try {
      this.authService.logout();
      Swal.fire({
        icon: 'success',
        title: 'Yes!',
        text: 'cierre de sesión exitoso!',
      })
      
      this.isLogged = false;

      localStorage.removeItem('id_user')
      localStorage.removeItem('token')
      localStorage.removeItem('email')


      this.router.navigate(['/home']);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error!',
      })
    }
  }

  onLogOut(){
    this.isLogged = false;
    localStorage.removeItem('id_user')
    localStorage.removeItem('token')
    localStorage.removeItem('email')

    this.router.navigate(['/home']);
  }

}
