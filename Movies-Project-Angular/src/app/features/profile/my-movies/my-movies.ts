import { Component, inject } from '@angular/core';
import { MoviesService } from '../../../core/service/movies.service';
import { AuthService } from '../../../core/service';
import { map, Observable, of } from 'rxjs';
import { Movie } from '../../../models/movies.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-movies',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-movies.html',
  styleUrl: './my-movies.css'
})
export class MyMovies {
private movieSevice = inject(MoviesService)
private authService = inject(AuthService);
private router = inject(Router);

 readonly currentUser = this.authService.currentUser;

myMovies$!: Observable<Movie[]>


ngOnInit(){
  const userId = this.authService.currentUser()?._id;

  if(userId){
    this.myMovies$ = this.movieSevice.getAll().pipe(
      map(movies => movies.filter(movie => movie.createdBy === userId))
    )
  }else{
    this.myMovies$ = of([]);
  }
}

goToDetails(id: string) {
    this.router.navigate(['/movies', id]);
  }

}
