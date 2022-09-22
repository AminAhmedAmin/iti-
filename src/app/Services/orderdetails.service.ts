import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {


  constructor(private _HttpClient: HttpClient) { }
  baseUrl: string = "http://abdulrhmanamir-001-site1.dtempurl.com/api/";

  addOrderDetail(orderDetial: any): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._HttpClient.post(`${this.baseUrl}orderDetails`, orderDetial, { headers: headers })
  }

}
