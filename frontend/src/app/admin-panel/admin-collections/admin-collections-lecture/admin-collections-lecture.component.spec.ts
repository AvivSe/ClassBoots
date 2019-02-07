import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionsLectureComponent } from './admin-collections-lecture.component';

describe('AdminCollectionsLectureComponent', () => {
  let component: AdminCollectionsLectureComponent;
  let fixture: ComponentFixture<AdminCollectionsLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollectionsLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollectionsLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
