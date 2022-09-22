import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = "http://abdulrhmanamir-001-site1.dtempurl.com/api/SubCategory/";
  constructor(private _HttpClient: HttpClient) { }

  getLabtop(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}1                             `);
  }
  getMobile(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}2                             `);
  }
  getTelevison(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}3                             `);
  }



}
