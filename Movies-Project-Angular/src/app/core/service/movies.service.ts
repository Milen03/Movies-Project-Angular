import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../../models/movies.model";

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private apiUrl = 'http://localhost:3000/api/movie';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.apiUrl);
  }

  getById(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.apiUrl}/${id}`);
  }

  create(movie: Partial<Movie>): Observable<Movie> {
    return this.httpClient.post<Movie>(this.apiUrl, movie,{
        withCredentials: true
    });
  }

  update(id: string, movie: Partial<Movie>): Observable<Movie> {
    return this.httpClient.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  like(id: string): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}/like`, {});
  }
}