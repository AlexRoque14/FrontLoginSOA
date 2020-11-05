import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common'

@Component({
  selector: 'app-vuelos-comprar',
  templateUrl: './vuelos-comprar.component.html',
  styleUrls: ['./vuelos-comprar.component.css'],
})
export class VuelosComprarComponent implements OnInit {

  public isLog1: boolean= false;
  public isLog: any;

  constructor() { }

  ngOnInit(): void {
    this.isLog = localStorage.getItem('isLog')
    if(this.isLog === "1"){
      this.isLog1 = true;
      console.log(this.isLog1)
    }
   
  }

}
