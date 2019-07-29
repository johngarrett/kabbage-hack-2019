import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysLunchComponent } from './todays-lunch.component';

describe('TodaysLunchComponent', () => {
  let component: TodaysLunchComponent;
  let fixture: ComponentFixture<TodaysLunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysLunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
