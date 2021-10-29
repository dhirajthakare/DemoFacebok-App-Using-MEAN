import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterRecoverCodeComponent } from './enter-recover-code.component';

describe('EnterRecoverCodeComponent', () => {
  let component: EnterRecoverCodeComponent;
  let fixture: ComponentFixture<EnterRecoverCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterRecoverCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterRecoverCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
