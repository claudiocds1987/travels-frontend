import { Component, Input, OnInit } from '@angular/core';
// material
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// components
import { MatDialogWeatherComponent } from '../utils/mat-dialog-weather/mat-dialog-weather.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  // recibing from home component
  @Input() weathers: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    //console.log('componente weather ' + JSON.stringify(this.weathers.weather[0].main));
    console.log('componente weather ' + JSON.stringify(this.weathers)); 
  }

  // ------------------------------------------------
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(MatDialogWeatherComponent, {
  //     width: '250px',
  //     //data: {name: this.name, animal: this.animal}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     //this.animal = result;
  //   });
  // }
  // -----------------------------------------------

}
