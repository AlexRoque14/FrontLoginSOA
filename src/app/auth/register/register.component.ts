import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit() {
  }

  async onRegister(){
    console.log('Form->' , this.loginForm.value);
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authService.register(email , password);
      if(user) {
        Swal.fire({
          icon: 'success',
          title: 'Yes!',
          text: 'Registro exitoso!',
        })
        this.router.navigate(['/verification-email']);
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error!',
      })
      
    }
  }

  cancel(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro de terminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Terminar registro!',
      cancelButtonText: 'Continuar con el registro!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'El proceso de registro ha sido cancelado.',
          'success'
        )
        this.router.navigate(['/home']);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Por favor, continue con el registro.',
          'error'
        )
      }
    })
  }   

}
