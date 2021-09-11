import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameDetailsService {
  public addGame$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/'

  getGameDetails() {
    // const url = 'http://localhost:3000/';
    return this.http.get<any>(this.url);
  }

  addGameDetails(body: any){
    const url = 'http://localhost:3000/';
    return this.http.post<any>(url, body);
  }

  updateCustomerDetails(body: any, id: any){
    const url = this.url + id;
    return this.http.patch<any>(url, body);
  }

  stop(id: any){
    const url = this.url + 'stop/' + id;
    return this.http.patch<any>(url, {});
  }

  public uploadImage(image: any, id: any): Observable<Response> {

    const formData = new FormData();
    const url = this.url + 'uploadImage/' + id;
    formData.append('image', image.file);

    return this.http.post<any>(url, formData);
  }
}
