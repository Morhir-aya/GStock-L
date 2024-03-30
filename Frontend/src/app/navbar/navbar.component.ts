import { Component } from '@angular/core';
import {AuthService} from "../services/Auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService ,
              private router: Router) { }

  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logout successful');
        this.router.navigate(['login-page']);
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }
}
