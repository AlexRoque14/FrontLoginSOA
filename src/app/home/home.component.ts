import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit(){
    
  }

}
