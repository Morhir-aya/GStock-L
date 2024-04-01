import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, tap} from "rxjs";
import {User} from "../../user";
import {Product} from "../product/product";

const httpOptions = {
    headers : new HttpHeaders({
        'content-Type' : 'application/json'
    })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/users';


  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/isLoggedIn`);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, null).pipe(
      tap(() => {
        console.log('Logout successful');
        // Optionally clear any local user-related data or tokens here
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        throw error; // Rethrow the error for the calling code to handle
      })
    );
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/userInfo`);
  }

  updateProfile(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/updateProfile`, updatedUser);
  }

  editUser(id : number){
    return this.http.get<User>(this.baseUrl+"/user/"+id);
  }

  updateUser(user : User){
    return this.http.put<User>(this.baseUrl+"/update", user, httpOptions);
  }
}
