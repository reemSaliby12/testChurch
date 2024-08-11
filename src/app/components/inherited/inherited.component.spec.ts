import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InheritedComponent } from './inherited.component';

describe('InheritedComponent', () => {
  let component: InheritedComponent;
  let fixture: ComponentFixture<InheritedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InheritedComponent]
    });
    fixture = TestBed.createComponent(InheritedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
