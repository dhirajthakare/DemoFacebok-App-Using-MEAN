import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeCallComponent } from './take-call.component';

describe('TakeCallComponent', () => {
  let component: TakeCallComponent;
  let fixture: ComponentFixture<TakeCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
