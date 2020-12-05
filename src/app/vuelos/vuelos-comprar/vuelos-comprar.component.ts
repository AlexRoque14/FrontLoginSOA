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
  

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { 
    
    this.registroForm = fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.isLog = localStorage.getItem('isLog')
    if(this.isLog === "1"){
      this.isLog1 = true;
      console.log(this.isLog1)
    }

    this.getDestino()
    this.getOrigen()
  }


  buscarVuelos(registroForm: any){
    try {
      const vuelo = (this.authService.ApiGetVuelo().subscribe(response => {
        if (vuelo) {
          this.vuelos = response['vuelos'];
          console.log(response);
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
    console.log(this.ori)
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


}
