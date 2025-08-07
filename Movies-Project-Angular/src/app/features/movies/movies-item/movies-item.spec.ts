import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesItem } from './movies-item';

describe('MoviesItem', () => {
  let component: MoviesItem;
  let fixture: ComponentFixture<MoviesItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
