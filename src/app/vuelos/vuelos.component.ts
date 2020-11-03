import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // pais(){
  //   this.API.getPais().subscribe(response =>{
  //     this.Paises = response;
  //     //console.log(this.Paises);
  //   })
  // }
  // extraeidPais(id){
  //   console.log("Hola");
    
  //   this.API.getEstados(id).subscribe(response =>{
  //     this.Estados = response;
  //   })
  //   console.log(id)
  // }
  // extraeidEstado(id){
  //   this.API.getMunicipios(id).subscribe(response =>{
  //     console.log(response['estadomunicipio']);
  //     this.Municipios = response['estadomunicipio'];
  //   })
  //   console.log(id)
  // }

}
