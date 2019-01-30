import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedVideosComponent } from './recommended-videos.component';

describe('RecommendedVideosComponent', () => {
  let component: RecommendedVideosComponent;
  let fixture: ComponentFixture<RecommendedVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
