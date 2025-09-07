import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudtutoriaForm } from './solicitudtutoria-form';

describe('SolicitudtutoriaForm', () => {
  let component: SolicitudtutoriaForm;
  let fixture: ComponentFixture<SolicitudtutoriaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudtutoriaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudtutoriaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
