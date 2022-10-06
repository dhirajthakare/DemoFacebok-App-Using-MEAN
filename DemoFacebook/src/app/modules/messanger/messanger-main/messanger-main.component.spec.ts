import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessangerMainComponent } from './messanger-main.component';

describe('MessangerMainComponent', () => {
  let component: MessangerMainComponent;
  let fixture: ComponentFixture<MessangerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessangerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessangerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
