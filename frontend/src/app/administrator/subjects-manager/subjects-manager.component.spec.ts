import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsManagerComponent } from './subjects-manager.component';

describe('SubjectsManagerComponent', () => {
  let component: SubjectsManagerComponent;
  let fixture: ComponentFixture<SubjectsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
