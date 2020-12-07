import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro-actividades',
  templateUrl: './registro-actividades.component.html',
  styleUrls: ['./registro-actividades.component.css'],
  providers: [AuthService]
})
export class RegistroActividadesComponent implements OnInit {

  constructor(private authService: AuthService , private router: Router , private fb: FormBuilder) { }

  users: any;


  ngOnInit(): void {
    this.pagValid();
    this.getArchivosLogs();
  }

  getArchivosLogs(){
    this.authService.getLogs().subscribe(response => {
      //console.log(response['logs'])
      this.users = response['logs'];
    })
  }

  pagValid(){
    if(localStorage.getItem('rol') != '2'){
      this.router.navigate(['']);
    }
  }

}
