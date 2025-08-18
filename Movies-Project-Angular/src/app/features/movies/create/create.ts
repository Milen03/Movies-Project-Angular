import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/service';
import { Router } from '@angular/router';
import { MoviesService } from '../../../core/service/movies.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
private authService = inject(AuthService);
private router = inject(Router);
private moviesService = inject(MoviesService);
private formBuilder = inject(FormBuilder);

 genres: string[] = ['Action', 'Comedy', 'Horror', 'Sci-Fi', 'Drama', 'Thriller'];

createForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    genre: ['', Validators.required],
    releaseDate: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
    imageUrl: ['', Validators.required]
  });

 onCansel(): void{
  this.router.navigate(['/movies']);
 }

 onSubmit(): void{
  if(this.createForm.valid){
    this.moviesService.create(this.createForm.value).subscribe({
      next: () => {
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        console.error('Error creating movie', err);
      }
    })
  }
 }
}
