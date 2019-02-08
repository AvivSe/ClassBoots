import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionsManagerComponent } from './admin-collections.component';

describe('AdminCollectionsManagerComponent', () => {
  let component: AdminCollectionsManagerComponent;
  let fixture: ComponentFixture<AdminCollectionsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollectionsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollectionsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
