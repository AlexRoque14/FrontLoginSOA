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

  origenes: any;
  destino: any;

  destino_id: String;
  origen_id: String;
  origin: any;
  vueloID: any;
  destiny: any;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

    this.registroForm = fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      id_origen: ['', [Validators.required]],
      id_destino: ['', [Validators.required]],
      operador: ['', [Validators.required]],
      clase: ['', [Validators.required]],
      sala: ['', [Validators.required]],
      hora_fecha: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
    this.pagValid();
    this.getDestino();
    this.getOrigen();
  }

  async onRegister(registroForm: any) {
    try {
      const vuelo = await(await this.authService.ApiSetVuelo(registroForm)).subscribe(response => {
        if (vuelo) {
          Swal.fire({
            icon: 'success',
            title: 'Yes!',
            text: 'Registro de vuelo exitoso!',
          });
          var date = new Date();
          const log = {
            id_usuario: localStorage.getItem('id_user'),
            name_usuario: localStorage.getItem('usuario'),
            status: 'Registro vuelo exitoso',
            metodo_inicio: 'Correo Electronico',
            hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
              + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
            roll: localStorage.getItem('rol'),
            actividad: "Registro nuevo vuelo"
          }

          //envia a el log
          this.authService.ApiSetLog(log).subscribe(response => {
            if (response) {
              console.log('Log creado', response)
            }
          }, err => {
            console.log(err)
          })
          console.log(response);
          this.router.navigate(['/lista-vuelos']);
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



  cancel() {
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

  getOrigen() {
    this.authService.getOrigenes().subscribe(response => {
      this.origenes = response['ori'];
      
    })
  }

  getDestino() {
    this.authService.getDestino().subscribe(response => {
      this.destino = response['destin']
    })
  }


  pagValid() {
    if (localStorage.getItem('rol') != '2') {
      this.router.navigate(['']);
    }
  }

  async geOri(id){
    await this.authService.getOrigenID(id).subscribe(response => {
      this.origin = response['ori'].nombre_origen;
      console.log(this.origin);
    })
  }

  async getDest(id){
    await this.authService.getDestinoID(id).subscribe(response =>{
      this.destiny = response['destin'].nombre_destino
      console.log( this.destiny)
    })
  }

  nombreD(destino){
    console.log(destino)
  }


}
