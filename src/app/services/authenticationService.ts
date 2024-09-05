import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup, Signin } from '../interfaces/authentication';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _HttpClient: HttpClient) {}
  currentUser = new BehaviorSubject(null);

  saveCurrentUser() {
    const token: any = localStorage.getItem('token');
    this.currentUser.next(jwtDecode(token));
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
