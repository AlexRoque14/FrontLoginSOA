import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [AuthService]
})
export class PasswordComponent implements OnInit {

  userEmail = new FormControl('' , Validators.required);

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  async forgot(){
    const email = this.userEmail.value;
    try {
      await this.auth.sendPassword(email);
      Swal.fire('Por favor, revisa tu correo electronico.')
      this.router.navigate(['/login'])
    } catch (error) {
      console.log(error)
    }

  }
}
