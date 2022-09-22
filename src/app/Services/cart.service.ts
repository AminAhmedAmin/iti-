import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }
  baseUrl: string = "http://abdulrhmanamir-001-site1.dtempurl.com/api/";
  CartNumbers: any;
  cartStats = new BehaviorSubject(null);
  removeCarts = new BehaviorSubject(null);
  addCart(cart: any): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._HttpClient.post(this.baseUrl + 'Carts', cart, { headers: headers }).pipe(
      tap(() => this.cartStats.next(null))
    )
  }
  getCartByUser(): Observable<any> {
    let id = localStorage.getItem('id');
    return this._HttpClient.get(`${this.baseUrl}Carts/getCartsbyUser/${id}`)
  }

  updateCarts(carts: any): Observable<any> {
    return this._HttpClient.put(this.baseUrl + 'Carts', carts);
  }

  removeCart(id: string): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._HttpClient.delete(`${this.baseUrl}Carts/${id}`, { headers: headers }).pipe(
      tap(() => this.removeCarts.next(null))
    )
  }



}
