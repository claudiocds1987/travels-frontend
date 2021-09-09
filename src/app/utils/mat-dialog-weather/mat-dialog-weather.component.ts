import { Component, Inject, OnInit } from '@angular/core';
// material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-weather',
  templateUrl: './mat-dialog-weather.component.html',
  styleUrls: ['./mat-dialog-weather.component.scss']
})
export class MatDialogWeatherComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MatDialogWeatherComponent>,
    // recibe la info enviada desde home.component.ts desde funcion openDialog() line 88
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // muestro la info enviada de la funcion openDialog() de home.component.ts
    console.log('mat-dialog-weather-component: ', this.data);
  }

}
