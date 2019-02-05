import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsManagerComponent } from './institutions-manager.component';

describe('InstitutionsManagerComponent', () => {
  let component: InstitutionsManagerComponent;
  let fixture: ComponentFixture<InstitutionsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
