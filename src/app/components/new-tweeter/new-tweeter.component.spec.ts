import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTweeterComponent } from './new-tweeter.component';

describe('NewTweeterComponent', () => {
  let component: NewTweeterComponent;
  let fixture: ComponentFixture<NewTweeterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTweeterComponent]
    });
    fixture = TestBed.createComponent(NewTweeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
