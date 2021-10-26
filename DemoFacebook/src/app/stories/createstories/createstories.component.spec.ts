import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestoriesComponent } from './createstories.component';

describe('CreatestoriesComponent', () => {
  let component: CreatestoriesComponent;
  let fixture: ComponentFixture<CreatestoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatestoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatestoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
