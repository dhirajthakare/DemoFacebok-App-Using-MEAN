import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndLoginComponent } from './create-and-login.component';

describe('CreateAndLoginComponent', () => {
  let component: CreateAndLoginComponent;
  let fixture: ComponentFixture<CreateAndLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAndLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAndLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
