import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup, Signin } from '../interfaces/authentication';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if(localStorage.getItem('token')){
      this.saveCurrentUser();
    }
  }
  currentUser = new BehaviorSubject(null);

  saveCurrentUser() {
    const token: any = localStorage.getItem('token');
    this.currentUser.next(jwtDecode(token));
  }

  checkToken() {
    const token: any = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout();
      this._Router.navigate(['/signin']);
    }
  }

  signUp(formData: Signup): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:3001/api/v1/auth/signup',
      formData
    );
  }

  signIn(formData: Signin): Observable<any> {
    return this._HttpClient.post(
      'http://localhost:3001/api/v1/auth/signin',
      formData
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null);
  }
}
