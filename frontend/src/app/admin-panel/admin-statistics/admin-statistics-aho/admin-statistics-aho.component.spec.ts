import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticsAhoComponent } from './admin-statistics-aho.component';

describe('AdminStatisticsAhoComponent', () => {
  let component: AdminStatisticsAhoComponent;
  let fixture: ComponentFixture<AdminStatisticsAhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticsAhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticsAhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
