import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiOpenweathermapService {

  private URI: string;
  private API_KEY = '55ea797e77f10c1c88623eee4601d4af'; // remember saving in .ENV
  
  constructor(private http: HttpClient) { 
    this.URI = `https://api.openweathermap.org/data/2.5/weather?&appid=${this.API_KEY}&q=`;
  }

  getWeather(cityName: string, countryCode: string): Observable<any>{
    return this.http.get<any[]>(`${this.URI}${cityName},${countryCode}`);
    //return this.http.get<any[]>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}`);
  }

}
