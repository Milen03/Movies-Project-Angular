import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMoviesItem } from './my-movies-item';

describe('MyMoviesItem', () => {
  let component: MyMoviesItem;
  let fixture: ComponentFixture<MyMoviesItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMoviesItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMoviesItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
