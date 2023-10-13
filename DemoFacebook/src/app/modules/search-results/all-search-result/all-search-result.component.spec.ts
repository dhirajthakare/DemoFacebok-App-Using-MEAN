import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSearchResultComponent } from './all-search-result.component';

describe('AllSearchResultComponent', () => {
  let component: AllSearchResultComponent;
  let fixture: ComponentFixture<AllSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
