import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiOpenweathermapService } from './../services/http/api-openweathermap.service';
import { MyApiService } from './../services/http/my-api.service';
import { Travel } from './../models/travel';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  weather = {} as any;
  dataSource: MatTableDataSource<Travel>;
  travels: Travel [] = [];
  displayedColumns: string[] = ['ciudad', 'codPais', 'vehiculo', 'fecha', 'actions'];
  // to manipulate DOM
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public apiOpenWeatherService: ApiOpenweathermapService,
    public myApiService: MyApiService
  ) {}

  ngOnInit(): void {
    this.getWeather('San Fernando', 'ar');
    this.getTravels();
  }

  getWeather(cityName: string, countryCode: string) {
    this.apiOpenWeatherService
      .getWeather(cityName, countryCode)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.weather = res;
        console.log(this.weather);
      });
  }

  getTravels() {
    this.myApiService
      .getTravels()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.travels = res;
        console.log(this.travels);
        this.dataSource = new MatTableDataSource(this.travels);
        this.dataSource.sort = this.sort; // !
        this.dataSource.paginator = this.paginator; //!
 

        // this.dataSource.filterPredicate = function(data, filter: string): boolean {
        //     return data.city.toLowerCase().includes(filter) || data.vehicleType.toString() === filter;    
        // };
      });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value; // !
    this.dataSource.filter = filterValue.trim(); // !
  }

  reschedule(){
    alert('Reprogramar para otra fecha')
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
