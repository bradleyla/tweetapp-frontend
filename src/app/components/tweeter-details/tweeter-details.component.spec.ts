import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweeterDetailsComponent } from './tweeter-details.component';

describe('TweeterDetailsComponent', () => {
  let component: TweeterDetailsComponent;
  let fixture: ComponentFixture<TweeterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TweeterDetailsComponent]
    });
    fixture = TestBed.createComponent(TweeterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
