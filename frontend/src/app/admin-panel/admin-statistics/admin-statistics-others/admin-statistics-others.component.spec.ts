import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticsOthersComponent } from './admin-statistics-others.component';

describe('AdminStatisticsOthersComponent', () => {
  let component: AdminStatisticsOthersComponent;
  let fixture: ComponentFixture<AdminStatisticsOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticsOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticsOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
