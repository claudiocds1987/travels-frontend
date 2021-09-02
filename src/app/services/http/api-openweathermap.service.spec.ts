import { TestBed } from '@angular/core/testing';

import { ApiOpenweathermapService } from './api-openweathermap.service';

describe('ApiOpenweathermapService', () => {
  let service: ApiOpenweathermapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOpenweathermapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
