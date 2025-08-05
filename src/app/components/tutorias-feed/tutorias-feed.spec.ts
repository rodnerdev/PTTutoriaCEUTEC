import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoriasFeed } from './tutorias-feed';

describe('TutoriasFeed', () => {
  let component: TutoriasFeed;
  let fixture: ComponentFixture<TutoriasFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutoriasFeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoriasFeed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
