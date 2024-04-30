import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweeterComponent } from './tweeter.component';

describe('TweeterComponent', () => {
  let component: TweeterComponent;
  let fixture: ComponentFixture<TweeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TweeterComponent]
    });
    fixture = TestBed.createComponent(TweeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
