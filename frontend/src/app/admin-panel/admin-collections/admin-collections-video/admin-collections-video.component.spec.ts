import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollectionsVideoComponent } from './admin-collections-video.component';

describe('AdminCollectionsVideoComponent', () => {
  let component: AdminCollectionsVideoComponent;
  let fixture: ComponentFixture<AdminCollectionsVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollectionsVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollectionsVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
