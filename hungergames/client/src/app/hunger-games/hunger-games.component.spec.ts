import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HungerGamesComponent } from './hunger-games.component';

describe('HungerGamesComponent', () => {
  let component: HungerGamesComponent;
  let fixture: ComponentFixture<HungerGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HungerGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HungerGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
