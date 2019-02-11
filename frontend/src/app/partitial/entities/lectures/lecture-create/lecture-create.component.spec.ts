import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureCreateComponent } from './lecture-create.component';

describe('LectureCreateComponent', () => {
  let component: LectureCreateComponent;
  let fixture: ComponentFixture<LectureCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
