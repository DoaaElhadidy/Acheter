import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostproductComponent } from './postproduct.component';

describe('PostproductComponent', () => {
  let component: PostproductComponent;
  let fixture: ComponentFixture<PostproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
