import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  _url = "http://abdulrhmanamir-001-site1.dtempurl.com/api/";
  updateStatus = new BehaviorSubject(null);
  constructor(private _http: HttpClient) { }

  ngOnInit(): void { }

  getProducts(): Observable<any> {
    return this._http.get(this._url + 'products')
  }
  getProductDetail(id: any): Observable<any> {
    return this._http.get<any>(this._url + 'products/' + id)
  }
  getSubCategoty(): Observable<any> {
    return this._http.get<any>(this._url + "subCategory");
  }
  getProductBySubCategory(ValueName: string): Observable<any> {
    return this._http.get<any>(this._url + "subCategory/" + ValueName);
  }

  // Create New Product
  // AddProduct(model: any): Observable<any> {
  //   let headers = new HttpHeaders({
  //     'token': `${localStorage.getItem('token')}`
  //   })
  //   return this._http.post(this._url + 'products', model, { headers: headers })
  // }

  // Create New Product
  createProduct(model: any): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._http.post(this._url + 'products', model, { headers: headers }).pipe(
      tap(() =>
        this.updateStatus.next(null)
      )
    )
  }


  // Update Product
  updateProduct(id: any, product: any): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._http.put(this._url + 'products/' + id, product, { headers: headers }).pipe(
      tap(() =>
        this.updateStatus.next(null)
      )
    )
  }

  //Delete Product
  deletProduct(id: string): Observable<any> {
    let headers = new HttpHeaders({
      'token': `${localStorage.getItem('token')}`
    })
    return this._http.delete(this._url + 'products/' + id, { headers: headers }).pipe(
      tap(() =>
        this.updateStatus.next(null)
      )
    )
  }
}
