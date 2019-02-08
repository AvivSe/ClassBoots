import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTwoComponent } from './empty-two.component';

describe('EmptyTwoComponent', () => {
  let component: EmptyTwoComponent;
  let fixture: ComponentFixture<EmptyTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
