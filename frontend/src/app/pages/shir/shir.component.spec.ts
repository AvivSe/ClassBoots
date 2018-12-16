import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirComponent } from './shir.component';

describe('ShirComponent', () => {
  let component: ShirComponent;
  let fixture: ComponentFixture<ShirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
