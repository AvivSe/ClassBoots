import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesManagerComponent } from './lectures-manager.component';

describe('LecturesManagerComponent', () => {
  let component: LecturesManagerComponent;
  let fixture: ComponentFixture<LecturesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
