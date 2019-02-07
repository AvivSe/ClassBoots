import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticsPieChartComponent } from './admin-statistics-pie-chart.component';

describe('AdminStatisticsPieChartComponent', () => {
  let component: AdminStatisticsPieChartComponent;
  let fixture: ComponentFixture<AdminStatisticsPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticsPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticsPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
