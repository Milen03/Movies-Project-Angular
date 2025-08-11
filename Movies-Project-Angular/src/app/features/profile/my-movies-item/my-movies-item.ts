import { Component, inject } from '@angular/core';
import { Movie } from '../../../models/movies.model';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../../core/service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviesService } from '../../../core/service/movies.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-my-movies-item',
  imports: [CommonModule,RouterLink],
  templateUrl: './my-movies-item.html',
  styleUrl: './my-movies-item.css'
})
export class MyMoviesItem {
movie$!: Observable<Movie>;
 private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => this.moviesService.getById(params.get('id')!))
    );
  }

 isOwner(movie: Movie): boolean {
  const currentUserId = this.authService.currentUser()?._id
  return currentUserId === movie.createdBy;
}

  onEdit(movie: Movie) {
    // навигация към edit страница (ако имаш)
    this.router.navigate(['/movies', movie._id, 'edit']);
  }

  onDelete(movie: Movie) {
    if (!confirm(`Delete "${movie.title}"?`)) return;
    this.moviesService.delete(movie._id).subscribe({
      next: () => this.router.navigate(['/movies']),
      error: (err) => {
        if (err?.status === 401) alert('Not allowed!');
        else alert('Delete failed. Try again.');
      }
    });
  }
}
