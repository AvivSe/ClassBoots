import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionsSubjectComponent } from './admin-collections-subject.component';

describe('AdminCollectionsSubjectComponent', () => {
  let component: AdminCollectionsSubjectComponent;
  let fixture: ComponentFixture<AdminCollectionsSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollectionsSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollectionsSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
