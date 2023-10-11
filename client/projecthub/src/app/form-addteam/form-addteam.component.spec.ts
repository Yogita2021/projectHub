import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddteamComponent } from './form-addteam.component';

describe('FormAddteamComponent', () => {
  let component: FormAddteamComponent;
  let fixture: ComponentFixture<FormAddteamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddteamComponent]
    });
    fixture = TestBed.createComponent(FormAddteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
