import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/Auth/auth.service";
import {User} from "../user";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../services/product/product";
import {Category} from "../services/category/category";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  currentUser! : User;
  newUserId! : number;
  constructor(private authService : AuthService,
              private activatedRoute : ActivatedRoute,
              private router: Router) {}


  //
  ngOnInit() {
    this.authService.getUserInfo().subscribe(
      (user: User) => {
        this.currentUser = user;
      });

  }


  updateUser() {
    this.authService.updateUser(this.currentUser).subscribe(updatedUser => {
        this.logout();
        this.router.navigate(['login-page']);
      }
    );
  }

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
