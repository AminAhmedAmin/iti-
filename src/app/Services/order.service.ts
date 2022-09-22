import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient: HttpClient) { }
  baseUrl: string = "http://abdulrhmanamir-001-site1.dtempurl.com/api/";


  addOrder(order: any): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._HttpClient.post(this.baseUrl + 'Orders', order, { headers: headers })
  }

  getOrderDetails(): Observable<any> {
    let id = localStorage.getItem('id');
    return this._HttpClient.get(`${this.baseUrl}Orders/getOrdersByUser/${id}`);
  }

  getOrder(): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._HttpClient.get(this.baseUrl + 'orders', { headers: headers })
  }
  deleteOrder(id:string):Observable<any>{
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._HttpClient.delete(this.baseUrl+'Orders/'+id,{ headers: headers })
  }

}
