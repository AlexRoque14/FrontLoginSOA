import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vuelos-comprar',
  templateUrl: './vuelos-comprar.component.html',
  styleUrls: ['./vuelos-comprar.component.css'],
  providers: [AuthService]
})
export class VuelosComprarComponent implements OnInit {

  public isLog1: boolean= false;
  public isLog: any;

  vueloID: any;
  origin2: any;
  destiny2: any;
  origenes: any;
  destino: any;
  registroForm: any;
  vuelos: any;
  ori: any;
  de: any;
  origenP: any;
  destinoP: any;
  registroForm2: any;
  vuelosopen: any;

  precio_basica: any;
  precio_clasica: any;
  precio_confort: any;
  precio_plus: any;
  precio_premiere: any;
  

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { 
    
    this.registroForm = fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
    })

    this.registroForm2 = fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      amount: ['1000', [Validators.required]],
      destino: [''],
      origen: ['']
    })
  }

  ngOnInit(): void {
    this.isLog = localStorage.getItem('isLog')
    if(this.isLog === "1"){
      this.isLog1 = true;
      //console.log(this.isLog1)
    }

    this.getDestino()
    this.getOrigen()
  }


  buscarVuelos(registroForm: any){
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

    this.ori = registroForm.origen
    this.de = registroForm.destino
    //console.log(this.ori)
  }




  //traer todos los destinos y origenes 
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


  //traer destinos y origenes por id
  geOri1(){
    this.authService.getOrigenID(this.vueloID.origen).subscribe(response =>{
        this.origin2 = response['ori'].nombre_origen
    })
  }

  getDest2(){
    this.authService.getDestinoID(this.vueloID.destino).subscribe(response =>{
      this.destiny2 = response['destin'].nombre_destino
    })
  }

  //imprime el nombre del destino
  nombreD(destino){
    console.log(destino)
  }

  //pago
  async comprarVuelo(registroForm2: any){
    if(registroForm2.amount == "1"){
      registroForm2.amount = this.precio_basica
      console.log(registroForm2.amount)
    }
    if(registroForm2.amount == "2"){
      registroForm2.amount = this.precio_clasica
      console.log(registroForm2.amount)
    }
    if(registroForm2.amount == "3"){
      registroForm2.amount = this.precio_confort
      console.log(registroForm2.amount)
    }
    if(registroForm2.amount == "4"){
      registroForm2.amount = this.precio_plus
      console.log(registroForm2.amount)
    }
    if(registroForm2.amount == "5"){
      registroForm2.amount = this.precio_premiere
      console.log(registroForm2.amount)
    }

    registroForm2.destino = this.destinoP
    registroForm2.origen = this.origenP

    await this.authService.setPagoOpenPay(registroForm2).subscribe(response =>{
      console.log(response)
      if(response){
        Swal.fire({
          icon: 'success',
          title: 'Yes!',
          text: 'Por favor, revisa tu correo electronico para continuar con el proceso.',
        });
      }
    })

  }

  //extraer datos del vuelo
  async datosVuelo(id){
    await this.authService.ApiGetVueloById(id).subscribe(response =>{
      this.origenP = response['vuelo'].origen
      this.destinoP = response['vuelo'].destino
      this.precio_basica = response['vuelo'].precio_basica
      this.precio_clasica = response['vuelo'].precio_clasica
      this.precio_confort = response['vuelo'].precio_confort
      this.precio_plus = response['vuelo'].precio_plus
      this.precio_premiere = response['vuelo'].precio_premiere
    })
  }

}
