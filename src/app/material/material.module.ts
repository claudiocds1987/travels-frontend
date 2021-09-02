import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Here declare all components we need from Angular Material
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatTableDataSource,
  ],
  exports: [
    MatTableModule,
    MatTableDataSource
  ]
})
export class MaterialModule { }
