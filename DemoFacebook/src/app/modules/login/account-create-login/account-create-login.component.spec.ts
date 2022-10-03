import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreateLoginComponent } from './account-create-login.component';

describe('AccountCreateLoginComponent', () => {
  let component: AccountCreateLoginComponent;
  let fixture: ComponentFixture<AccountCreateLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCreateLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
