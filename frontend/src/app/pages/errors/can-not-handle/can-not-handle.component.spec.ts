import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanNotHandleComponent } from './can-not-handle.component';

describe('CanNotHandleComponent', () => {
  let component: CanNotHandleComponent;
  let fixture: ComponentFixture<CanNotHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanNotHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanNotHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
