import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastWatchesComponent } from './last-watches.component';

describe('LastWatchesComponent', () => {
  let component: LastWatchesComponent;
  let fixture: ComponentFixture<LastWatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastWatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastWatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
