import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  // recibing from home component
  @Input() weathers: any;
  listArray: any[] = [];
  
  constructor() {}

  ngOnInit(): void {
    //console.log('componente weather ' + JSON.stringify(this.weathers.weather[0].main));
    console.log('componente weather ' + JSON.stringify(this.weathers));
  
  }

}
