import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectlistComponent } from './user-projectlist.component';

describe('UserProjectlistComponent', () => {
  let component: UserProjectlistComponent;
  let fixture: ComponentFixture<UserProjectlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProjectlistComponent]
    });
    fixture = TestBed.createComponent(UserProjectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
