import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerMenuComponent } from './manger-menu.component';

describe('MangerMenuComponent', () => {
  let component: MangerMenuComponent;
  let fixture: ComponentFixture<MangerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
