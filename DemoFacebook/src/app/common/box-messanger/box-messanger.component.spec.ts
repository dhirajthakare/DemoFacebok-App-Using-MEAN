import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMessangerComponent } from './box-messanger.component';

describe('BoxMessangerComponent', () => {
  let component: BoxMessangerComponent;
  let fixture: ComponentFixture<BoxMessangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxMessangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxMessangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
