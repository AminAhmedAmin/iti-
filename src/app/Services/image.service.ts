import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _HttpClient: HttpClient) { }
  _url = "http://abdulrhmanamir-001-site1.dtempurl.com/api/";

  uploadImage(file: File): Observable<any> {
    var formdata = new FormData();
    formdata.append('image', file);
    return this._HttpClient.post(this._url + "images", formdata);
  }

  addProductImages(data: any): Observable<any> {
    return this._HttpClient.post(this._url + "productImages", data)
  }

  DeleteImage(id: number): Observable<any> {
    return this._HttpClient.delete(this._url + "productImages" + '/' + id)
  }

  getImages(id: number): Observable<any> {
    return this._HttpClient.get(this._url + "productImages" + '/' + id)
  }

}
