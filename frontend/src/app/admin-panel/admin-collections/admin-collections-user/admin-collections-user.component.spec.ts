import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionsUserComponent } from './admin-collections-user.component';

describe('AdminCollectionsUserComponent', () => {
  let component: AdminCollectionsUserComponent;
  let fixture: ComponentFixture<AdminCollectionsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollectionsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollectionsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
