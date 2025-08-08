import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MoviesService } from '../../../core/service/movies.service';
import { Movie } from '../../../models/movies.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/service';

@Component({
  selector: 'app-movies-item',
  imports: [CommonModule,RouterLink],
  templateUrl: './movies-item.html',
  styleUrl: './movies-item.css'
})
export class MoviesItem {

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

