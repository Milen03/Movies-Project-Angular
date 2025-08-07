import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service';
import { Observable } from 'rxjs';
import { MoviesService } from '../../../core/service/movies.service';
import { Movie } from '../../../models/movies.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [CommonModule],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies {

  private authService = inject(AuthService)
  private router = inject(Router);  
  readonly isLoggedIn = this.authService.isLoggedIn

  movies$ : Observable<Movie[]>;

  constructor(private moviesService: MoviesService){
    
    this.movies$ = this.moviesService.movies$;

    this.moviesService.getAll().subscribe()
  }

  goToDetails(id: string) {
    this.router.navigate(['/movies', id]);
  }
}
