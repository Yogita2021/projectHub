import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamMemberComponent } from './add-team-member.component';

describe('AddTeamMemberComponent', () => {
  let component: AddTeamMemberComponent;
  let fixture: ComponentFixture<AddTeamMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTeamMemberComponent]
    });
    fixture = TestBed.createComponent(AddTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
