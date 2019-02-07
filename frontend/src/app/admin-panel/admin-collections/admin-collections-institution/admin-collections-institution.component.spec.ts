import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionsInstitutionComponent } from './admin-collections-institution.component';

describe('AdminCollectionsInstitutionComponent', () => {
  let component: AdminCollectionsInstitutionComponent;
  let fixture: ComponentFixture<AdminCollectionsInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollectionsInstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollectionsInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
