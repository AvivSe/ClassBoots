import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticsGroupbyComponent } from './admin-statistics-groupby.component';

describe('AdminStatisticsGroupbyComponent', () => {
  let component: AdminStatisticsGroupbyComponent;
  let fixture: ComponentFixture<AdminStatisticsGroupbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticsGroupbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticsGroupbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
