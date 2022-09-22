import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://abdulrhmanamir-001-site1.dtempurl.com/api/users";
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token') != null) {
      this.saveData();
    }
  }
  userRole = new BehaviorSubject(null);
  saveData() {
    let token = JSON.stringify(localStorage.getItem('token'));
    let userData: any = jwtDecode(token);
    localStorage.setItem('id', userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']);
    localStorage.setItem('name', userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    this.userRole.next(userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

  }

  signup(signup: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + '/signup', signup)
  }
  signin(signin: any): Observable<any> {

    return this._HttpClient.post(this.baseUrl + '/signin', signin)
  }

  getUserData(): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    let id = localStorage.getItem('id');
    return this._HttpClient.get(`${this.baseUrl}/${id}`, { headers: headers });
  }
  signOut() {
    localStorage.clear();
    this._Router.navigateByUrl('/signin');

  }



}

