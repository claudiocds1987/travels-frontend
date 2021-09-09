import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Travel } from '../models/travel';
// services
import { MyApiService } from './../services/http/my-api.service';
import { ApiOpenweathermapService } from './../services/http/api-openweathermap.service';

// remember npm i mat-table-filter in app.module to filter table

export interface weather{
  main: string,
  description: string
}

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
})
export class PruebaComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  filterEntity: Travel;
  filterType: MatTableFilter;
  displayedColumns: string[] = ['ciudad', 'codPais', 'vehiculo', 'fecha', 'actions'];
  dataSource;
  travels: Travel[] = [];
  data: any[] = [];
 
  // to manipulate DOM
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public myApiService: MyApiService,
    public apiOpenWeatherService: ApiOpenweathermapService
    ) {}

  ngOnInit(): void {
    this.getTravels();
  }

  getTravels() {
    this.filterEntity = {} as Travel;
    this.myApiService
      .getTravels()
      .pipe(takeUntil(this.unsubscribe$)) // unsubscribe observable
      .subscribe((res) => {
        this.travels = res;
        console.log(this.travels);
      // remember npm i mat-table-filter in app.module to filter table
      // Do not forget to initialize your object and it's non-primitive properties
      // this.filterEntity = {} as Travel;
      this.filterType = MatTableFilter.ANYWHERE;
      this.dataSource = new MatTableDataSource(this.travels);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      });
  }

  getWeather(cityName: string, countryCode: string) {
    this.apiOpenWeatherService
      .getWeather(cityName, countryCode)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
       this.data = res.list;
        console.log('get weather: ', this.data);
      });
  }

  reschedule(){
    console.log('reprogramar')
  }

  cancel(){
    console.log('cancelar viaje');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
