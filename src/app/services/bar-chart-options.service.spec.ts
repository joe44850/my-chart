/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BarChartOptionsService } from './bar-chart-options.service';

describe('Service: BarChartOptions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarChartOptionsService]
    });
  });

  it('should ...', inject([BarChartOptionsService], (service: BarChartOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
