import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-vuelos',
  templateUrl: './lista-vuelos.component.html',
  styleUrls: ['./lista-vuelos.component.css'],
  providers: [AuthService]
})
export class ListaVuelosComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { 
    this.registroForm = fb.group({
      operador: ['', [Validators.required]],
      clase: ['', [Validators.required]],
      sala: ['', [Validators.required]],
      hora: ['', [Validators.required]],
    })
  }
  
  public vuelos:any;      public operador:any;
  public idVuelo;         public sala:any;
  public vueloID: any;    public hora:any;
  public clase:any;       
  
  public origin: any;
  public destiny: any;

  public destiny2: any;
  public origin2:any;

  registroForm: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.pagValid();
    this.getVuelos();
  }


  async getVuelos() {
    try {
      const vuelo = (this.authService.ApiGetVuelo().subscribe(response => {
        if (vuelo) {
          this.vuelos = response['vuelos'];
          //console.log(response);
        }
      })
      )
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al obtener la lista!',
      })
    }
  }
  
  async onEdit(registroForm: any) {
    try {
      const vuelo = (await this.authService.ApiUpdateVueloById(this.vueloID.id,registroForm)).subscribe(response => {
        if (vuelo) {
          Swal.fire({
            icon: 'success',
            title: 'Yes!',
            text: 'Actualización de vuelo exitoso!',
          });
          var date = new Date();
          const log = {
            id_usuario: localStorage.getItem('id_user'),
            name_usuario: localStorage.getItem('usuario'),
            status: 'Actualizacion vuelo exitoso',
            metodo_inicio: 'Correo Electronico',
            hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
              + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
            roll: localStorage.getItem('rol'),
            actividad: "Edicion de vuelo"
          }

          //envia a el log
          this.authService.ApiSetLog(log).subscribe(response => {
            // if (response) {
            //   console.log('Log creado', response)
            // }
          }, err => {
            console.log(err)
          })
          console.log(response);
          location.reload()
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

  editarVuelo(id: any){
      this.authService.ApiGetVueloById(id).subscribe(response =>{
        this.vueloID = response['vuelo']
        //console.log(this.vueloID)
        this.operador = this.vueloID.operador;
        this.clase = this.vueloID.clase;
        this.sala = this.vueloID.sala;
        this.hora = this.vueloID.hora_fecha
        this.origin = this.vueloID.origen
        this.destiny = this.vueloID.destino
        //this.getDest()
        //this.geOri()
    })
  }

  geOri(){
    this.authService.getOrigenID(this.vueloID.id_origen).subscribe(response =>{
        this.origin = response['ori'].nombre_origen
    })
  }

  getDest(){
    this.authService.getDestinoID(this.vueloID.id_destino).subscribe(response =>{
      this.destiny = response['destin'].nombre_destino
    })
  }


  eliminarVuelo(id: any){
    this.authService.ApiDeleteVueloById(id).subscribe(response =>{
      //console.log(response)
      var date = new Date();
      const log = {
        id_usuario: localStorage.getItem('id_user'),
        name_usuario: localStorage.getItem('usuario'),
        status: 'Eliminación de vuelo exitoso',
        metodo_inicio: 'Correo Electronico',
        hora_fecha: 'Fecha: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear()
          + '--- Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
        roll: localStorage.getItem('rol'),
        actividad: "Eliminar vuelo"
      }

      //envia a el log
      this.authService.ApiSetLog(log).subscribe(response => {
        // if (response) {
        //   console.log('Log creado', response)
        // }
      }, err => {
        console.log(err)
      })
      location.reload();
    })
    
  }



  //validar sesion
  pagValid(){
    if(localStorage.getItem('rol') != '2'){
      this.router.navigate(['']);
    }
  }

}
