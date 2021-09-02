import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// models
import { Travel } from './../../models/travel';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {

  private URI = 'https://localhost:44304/api/';

  constructor(private http: HttpClient) { }

  getTravels(): Observable<any>{
    return this.http.get<Travel[]>(this.URI + 'travel');
  }

}
