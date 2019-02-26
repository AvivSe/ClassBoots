import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeCommentsComponent } from './youtube-comments.component';

describe('YoutubeCommentsComponent', () => {
  let component: YoutubeCommentsComponent;
  let fixture: ComponentFixture<YoutubeCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
