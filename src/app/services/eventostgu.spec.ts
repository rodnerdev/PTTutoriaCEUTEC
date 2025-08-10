import { TestBed } from '@angular/core/testing';

import { Eventostgu } from './eventostgu';

describe('Eventostgu', () => {
  let service: Eventostgu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Eventostgu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
