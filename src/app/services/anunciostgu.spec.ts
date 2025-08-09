import { TestBed } from '@angular/core/testing';

import { Anunciostgu } from './anunciostgu';

describe('Anunciostgu', () => {
  let service: Anunciostgu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anunciostgu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
