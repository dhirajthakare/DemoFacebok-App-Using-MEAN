import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMessengerComponent } from './box-messenger.component';

describe('BoxMessengerComponent', () => {
  let component: BoxMessengerComponent;
  let fixture: ComponentFixture<BoxMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxMessengerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
