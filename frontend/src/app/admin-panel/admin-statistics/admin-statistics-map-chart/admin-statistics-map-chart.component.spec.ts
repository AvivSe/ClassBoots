import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticsMapChartComponent } from './admin-statistics-map-chart.component';

describe('AdminStatisticsMapChartComponent', () => {
  let component: AdminStatisticsMapChartComponent;
  let fixture: ComponentFixture<AdminStatisticsMapChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticsMapChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticsMapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
