import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindYourAccountPageComponent } from './find-your-account-page.component';

describe('FindYourAccountPageComponent', () => {
  let component: FindYourAccountPageComponent;
  let fixture: ComponentFixture<FindYourAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindYourAccountPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindYourAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
