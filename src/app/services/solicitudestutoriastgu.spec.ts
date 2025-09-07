import { TestBed } from '@angular/core/testing';

import { Solicitudestutoriastgu } from './solicitudestutoriastgu';

describe('Solicitudestutoriastgu', () => {
  let service: Solicitudestutoriastgu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Solicitudestutoriastgu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
