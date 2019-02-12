import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionCreateComponent } from './institution-create.component';

describe('InstitutionCreateComponent', () => {
  let component: InstitutionCreateComponent;
  let fixture: ComponentFixture<InstitutionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
