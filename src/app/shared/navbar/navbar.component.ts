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

  constructor(private authService: AuthService , private router: Router) { }

  async ngOnInit() {
  }

  async onOut(){
    try {
      this.authService.logout();
      Swal.fire({
        icon: 'success',
        title: 'Yes!',
        text: 'cierre de sesión exitoso!',
      })
      this.router.navigate(['/home']);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error!',
      })
    }
  }

}
