import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-vuelo',
  templateUrl: './registrar-vuelo.component.html',
  styleUrls: ['./registrar-vuelo.component.css'],
  providers: [AuthService]
})

export class RegistrarVueloComponent implements OnInit {

  registroForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService , private router: Router , private fb: FormBuilder) { 
    
    this.registroForm = fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      operador: ['', [Validators.required]],
      clase: ['', [Validators.required]],
      sala: ['', [Validators.required]],
      hora: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
  }

  async onRegister(registroForm: any){
    try {
      const vuelo = (await this.authService.ApiSetVuelo(registroForm)).subscribe(response => {
        if (vuelo) {
          Swal.fire({
            icon: 'success',
            title: 'Yes!',
            text: 'Registro de vuelo exitoso!',
          });
          console.log(response);
          this.router.navigate(['/']);
        }
      })
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
