import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddTakComponent } from './form-add-tak.component';

describe('FormAddTakComponent', () => {
  let component: FormAddTakComponent;
  let fixture: ComponentFixture<FormAddTakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddTakComponent]
    });
    fixture = TestBed.createComponent(FormAddTakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
