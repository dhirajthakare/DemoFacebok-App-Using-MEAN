import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDetailsDialogComponent } from './edit-profile-details-dialog.component';

describe('EditProfileDetailsDialogComponent', () => {
  let component: EditProfileDetailsDialogComponent;
  let fixture: ComponentFixture<EditProfileDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
