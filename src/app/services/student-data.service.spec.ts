/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentDataService } from './student-data.service';

describe('Service: StudentData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentDataService]
    });
  });

  it('should ...', inject([StudentDataService], (service: StudentDataService) => {
    expect(service).toBeTruthy();
  }));
});
