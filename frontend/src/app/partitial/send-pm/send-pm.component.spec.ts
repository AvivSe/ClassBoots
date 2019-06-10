import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPmComponent } from './send-pm.component';

describe('SendPmComponent', () => {
  let component: SendPmComponent;
  let fixture: ComponentFixture<SendPmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
