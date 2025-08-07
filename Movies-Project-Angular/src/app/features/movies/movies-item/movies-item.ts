import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MoviesService } from '../../../core/service/movies.service';
import { Movie } from '../../../models/movies.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-item',
  imports: [CommonModule,RouterLink],
  templateUrl: './movies-item.html',
  styleUrl: './movies-item.css'
})
export class MoviesItem {
movie$!: Observable<Movie>;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => this.moviesService.getById(params.get('id')!))
    );
  }
}
