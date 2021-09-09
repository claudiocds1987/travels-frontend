import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
// remember npm i mat-table-filter in app.module to filter table
import { MatTableFilter } from 'mat-table-filter';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
// models
import { Travel } from '../models/travel';
// services
import { MyApiService } from './../services/http/my-api.service';
import { ApiOpenweathermapService } from './../services/http/api-openweathermap.service';
// mat dialog
import { MatDialog } from '@angular/material/dialog';
import { MatDialogWeatherComponent } from '../utils/mat-dialog-weather/mat-dialog-weather.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
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
    public apiOpenWeatherService: ApiOpenweathermapService,
    public myApiService: MyApiService,
    public dialog: MatDialog //?
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
        // abro el modal "mat-dialog-weather.component"
        this.openDialog();
      });
  }

  reschedule(){
    console.log('reprogramar')
  }

  cancel(){
    console.log('cancelar viaje');
  }

  // open component dialog "mat-dialog-weather-component"
  openDialog(): void {
    const dialogRef = this.dialog.open(MatDialogWeatherComponent, {
      width: '320px', // ancho del modal dialog
      data: {
        dataKey: this.data // envio data a mat-dialog-weather-component
      }
    });
    // para cerrar el modal.
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
