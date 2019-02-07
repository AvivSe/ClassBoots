import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionsSchoolComponent } from './admin-collections-school.component';

describe('AdminCollectionsSchoolComponent', () => {
  let component: AdminCollectionsSchoolComponent;
  let fixture: ComponentFixture<AdminCollectionsSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollectionsSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollectionsSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
