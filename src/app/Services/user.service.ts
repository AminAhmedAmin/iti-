import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url = "http://abdulrhmanamir-001-site1.dtempurl.com/api/"

  constructor(private _http: HttpClient) { }

  getAllUser(): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._http.get<any>(this._url + 'users', { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateUser(id: string, user: any): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._http.patch<any>(this._url + 'users/' + id, user, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteUser(id: string): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._http.delete(this._url + 'users/' + id, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  getUsers(): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._http.get(this._url + 'users', { headers: headers })
  }
}
