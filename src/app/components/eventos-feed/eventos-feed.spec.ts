import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosFeed } from './eventos-feed';

describe('EventosFeed', () => {
  let component: EventosFeed;
  let fixture: ComponentFixture<EventosFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosFeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosFeed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
