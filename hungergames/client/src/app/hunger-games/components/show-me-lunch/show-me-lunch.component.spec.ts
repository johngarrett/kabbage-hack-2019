import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMeLunchComponent } from './show-me-lunch.component';

describe('ShowMeLunchComponent', () => {
  let component: ShowMeLunchComponent;
  let fixture: ComponentFixture<ShowMeLunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMeLunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMeLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
