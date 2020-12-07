import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

 loginForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService , private router: Router , private fb: FormBuilder) { 
  
    this.loginForm = fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required , Validators.email])],
      password: ['',Validators.compose(
        [Validators.required,
         Validators.minLength(8),
         Validators.maxLength(15),
         RegisterComponent.patternValidator(/\d/, { numero: true }),
         RegisterComponent.patternValidator(/[A-Z]/, { mayuscula: true }),
         RegisterComponent.patternValidator(/[a-z]/, { minuscula: true }),
         RegisterComponent.patternValidator(/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g, { caracter: true })
      ]
      )],
      confirmPasword: ['', [Validators.required]],
      roll: ['1']    //1 es usuario normal - 2 es administrador
    }, { 
      validator: this.ConfirmedValidator('password', 'confirmPasword')
    })
  }



  ngOnInit() {
  }
  
  async onRegister(loginForm: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Confirmación de registro',
      text: "Al continuar con el registro estas aceptando que estas de acuerdo con nuestras politicas de privacidad",
      footer: '<a href="/Politicas" target="_blank">Ver Politicas</a>',
      icon: 'warning',
      confirmButtonText: 'He leido y acepto las politicas de privacidad',
      cancelButtonText: 'No estoy de acuerdo!',
      showCancelButton: true,
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const user = await (await this.authService.Apiregistro(loginForm)).subscribe(response=>{ 
            if(user) {
              Swal.fire({
                icon: 'success',
                title: 'Yes!',
                text: 'Registro exitoso!',
              })
              const correo = {
                email : loginForm.email
              }
    
              this.authService.sendEmailRegistro(correo).subscribe(response => {
                // if (response) {
                //   console.log('email enviado', response)
                // }
              }, err => {
                console.log(err)
              })
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
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'error'
        )
      }
    })

  }

  async onRegisterFirebase(){
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authService.register(email , password);
      if(user) {
        Swal.fire({
          icon: 'success',
          title: 'Yes!',
          text: 'Registro exitoso!',
        })
        this.router.navigate(['/verification-email']);
      }
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

  
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (pass: AbstractControl): { [key: string]: any } => {
      if (!pass.value) {
        // if pass is empty return no error
        return null;
      }
  
      // test the value of the pass against the regexp supplied
      const valid = regex.test(pass.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  get f(){
    return this.loginForm.controls;
  }
   

  ConfirmedValidator(password: string, confirmPassword: string){
    return (formGroup: FormGroup) => {
        const pass = formGroup.controls[password];
        const confPassword = formGroup.controls[confirmPassword];
        if (confPassword.errors && !confPassword.errors.confirmedValidator) { 
            return;
        }
        if (pass.value !== confPassword.value) {
            confPassword.setErrors({ confirmedValidator: true });
        } else {
            confPassword.setErrors(null);
        }
    }
}

}
