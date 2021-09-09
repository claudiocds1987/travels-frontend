import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogWeatherComponent } from './mat-dialog-weather.component';

describe('MatDialogWeatherComponent', () => {
  let component: MatDialogWeatherComponent;
  let fixture: ComponentFixture<MatDialogWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDialogWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
