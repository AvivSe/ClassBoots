import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosManagerComponent } from './videos-manager.component';

describe('VideosManagerComponent', () => {
  let component: VideosManagerComponent;
  let fixture: ComponentFixture<VideosManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
