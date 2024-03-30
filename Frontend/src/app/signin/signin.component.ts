import { Component } from '@angular/core';
import {AuthService} from "../services/Auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful:', response);
        this.router.navigate(['login-page']);
      },
      error => {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration unsuccessful, try another username!';
      }
    );
  }
}
