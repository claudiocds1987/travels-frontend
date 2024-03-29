import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Travel } from '../models/travel';
import { MyApiService } from './../services/http/my-api.service';

// remember npm i mat-table-filter in app.module to filter table

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
})
export class PruebaComponent implements OnInit {
  filterEntity: Travel;
  filterType: MatTableFilter;
  displayedColumns: string[] = ['ciudad', 'codPais', 'vehiculo', 'fecha'];
  dataSource;
  travels: Travel[] = [];
  // to manipulate DOM
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public myApiService: MyApiService) {}

  ngOnInit(): void {
    this.filterEntity = {} as Travel;
    this.myApiService.getTravels().subscribe((res) => {
      this.travels = res;
      console.log(this.travels);
      // // Do not forget to initialize your object and it's non-primitive properties
      // this.filterEntity = {} as Travel;
      this.filterType = MatTableFilter.ANYWHERE;
      this.dataSource = new MatTableDataSource(this.travels);
      this.dataSource.sort = this.sort; // !
      this.dataSource.paginator = this.paginator; //!
    });
  }
}
