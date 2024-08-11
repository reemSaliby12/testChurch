import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurchComponent } from './add-curch.component';

describe('AddCurchComponent', () => {
  let component: AddCurchComponent;
  let fixture: ComponentFixture<AddCurchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCurchComponent]
    });
    fixture = TestBed.createComponent(AddCurchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
