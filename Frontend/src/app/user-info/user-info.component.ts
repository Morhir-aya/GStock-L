import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/Auth/auth.service";
import {User} from "../user";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit{
  userInfo: User | null = null;
  constructor(private authService : AuthService) {
  }

  ngOnInit() {
    this.authService.getUserInfo().subscribe(
      (user: User) => {
        this.userInfo = user;
      },
      error => {
        console.error('Error fetching user info:', error);
        // Handle error, e.g., display error message to the user
      }
    );
  }

}
