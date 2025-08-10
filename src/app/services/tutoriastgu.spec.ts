import { TestBed } from '@angular/core/testing';

import { Tutoriastgu } from './tutoriastgu';

describe('Tutoriastgu', () => {
  let service: Tutoriastgu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tutoriastgu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
