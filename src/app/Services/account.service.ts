import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  _url = "http://abdulrhmanamir-001-site1.dtempurl.com/api/"


  constructor(private _httpClient: HttpClient) { }

  getAccountDataById(id: string): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    });
    return this._httpClient.get<any>(this._url + 'Users/' + id, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateAddressData(addressId: string, address: any): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    });
    return this._httpClient.patch<any>(this._url + 'Addresses/' + addressId, address, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  updateAccountData(id: string, user: any): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    });
    return this._httpClient.patch<any>(this._url + 'Users/' + id, user, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // getOrderDataById(id:string):Observable<any>{
  //   let headers=new HttpHeaders({
  //     'token':`${localStorage.getItem('token')}`
  //   });
  //   return this._httpClient.get<any>(this._url + 'Users/'+id,{headers:headers})
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
