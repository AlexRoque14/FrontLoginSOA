import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }
  public vuelos:any;

  ngOnInit(): void {
    this.getVuelos();
  }


  async getVuelos() {
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
        text: 'Ha ocurrido un error!',
      })
    }

  }

}
