import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { MoviesService } from '../../../core/service/movies.service';
import { Movie } from '../../../models/movies.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, RouterLink],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies {

  private authService = inject(AuthService)
  private router = inject(Router);
  private moviesService = inject(MoviesService);

  readonly isLoggedIn = this.authService.isLoggedIn

  private selectedGenre = new BehaviorSubject<string>('All')


  movies$!: Observable<Movie[]>;
  genres$!: Observable<string[]>;


  ngOnInit() {
    const allMovies$ = this.moviesService.movies$;

    this.genres$ = allMovies$.pipe(
      map(movies => [...new Set(movies.map(m => m.genre))])
    )

    //  Модифицираме съществуващия `movies$` да филтрира
    this.movies$ = combineLatest([
      allMovies$,
      this.selectedGenre.asObservable()
    ]).pipe(
      map(([movies, selectedGenre]) => {
        if (selectedGenre === 'All') {
          return movies;
        }
        return movies.filter(movie => movie.genre === selectedGenre);
      })
    );

    //  Зареждаме данните от API-то
    this.moviesService.getAll().subscribe();
  }

   onGenreChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedGenre.next(selectedValue);
  }

  
  goToDetails(id: string) {
    this.router.navigate(['/movies', id]);
  }
}
