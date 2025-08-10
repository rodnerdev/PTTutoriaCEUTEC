import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormEditar } from './post-form-editar';

describe('PostFormEditar', () => {
  let component: PostFormEditar;
  let fixture: ComponentFixture<PostFormEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFormEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostFormEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
