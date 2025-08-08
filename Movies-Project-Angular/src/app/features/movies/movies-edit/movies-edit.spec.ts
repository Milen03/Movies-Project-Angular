import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesEdit } from './movies-edit';

describe('MoviesEdit', () => {
  let component: MoviesEdit;
  let fixture: ComponentFixture<MoviesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
