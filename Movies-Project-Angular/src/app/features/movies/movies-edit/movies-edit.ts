import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../../core/service/movies.service';
import { AuthService } from '../../../core/service'; // провери пътя ти
import { Movie } from '../../../models/movies.model';

@Component({
  selector: 'app-movies-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgIf],
  templateUrl: './movies-edit.html',
  styleUrl: './movies-edit.css'
})
export class MoviesEdit implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);
  private formBuilder = inject(FormBuilder);

  readonly currentUser = this.authService.currentUser;
  editForm!: FormGroup;
  movieId!: string;

  ngOnInit(): void {
    // форма
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required],       // yyyy-MM-dd (input type="date")
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^(https?:\/\/).+/i)]],
    });

    // id от URL
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      // fallback – ако няма id, върни към списъка
      this.router.navigate(['/movies']);
      return;
    }
    this.movieId = id;

    // зареди филма и patch-вай формата
    this.moviesService.getById(id).subscribe({
      next: (m: Movie) => {
        this.editForm.patchValue({
          title: m.title,
          genre: m.genre,
          releaseDate: this.toDateInput(m.releaseDate),
          description: m.description,
          imageUrl: m.imageUrl
        });
      },
      error: (err) => {
        console.error('Failed to load movie', err);
        this.router.navigate(['/movies', id]); // или покажи грешка
      }
    });
  }

  private toDateInput(value: string | Date): string {
    const d = typeof value === 'string' ? new Date(value) : value;
    // yyyy-MM-dd за <input type="date">
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
      .toISOString()
      .slice(0, 10);
  }

  onSubmit(): void {
    if (this.editForm.invalid || !this.movieId) return;

    const dto = {
      title: this.editForm.value.title!,
      genre: this.editForm.value.genre!,
      releaseDate: this.editForm.value.releaseDate!, // backend да го парсне
      description: this.editForm.value.description!,
      imageUrl: this.editForm.value.imageUrl!
    };

    this.moviesService.update(this.movieId, dto).subscribe({
      next: (updated) => this.router.navigate(['/movies', updated._id]),
      error: (err) => {
        if (err?.status === 401) {
          alert('Not allowed!'); // бекендът ти връща 401 ако не си owner
        } else {
          alert('Update failed. Try again.');
        }
        console.error(err);
      }
    });
  }

  onCancel(): void {
    if (this.movieId) this.router.navigate(['/movies', this.movieId]);
    else this.router.navigate(['/movies']);
  }
}
