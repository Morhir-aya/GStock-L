import { Component } from '@angular/core';
import {AuthService} from "../services/Auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        console.log('Login successful:', response);
        this.router.navigate(['productList']);
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }
}
