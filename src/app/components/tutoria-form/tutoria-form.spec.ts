import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoriaForm } from './tutoria-form';

describe('TutoriaForm', () => {
  let component: TutoriaForm;
  let fixture: ComponentFixture<TutoriaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutoriaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoriaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
