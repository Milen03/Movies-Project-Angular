import { Routes } from '@angular/router';
import { NotFount } from './shared/components';
import { authGuard } from './core/guards';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
    {
        path: 'create',
        canActivate: [authGuard],
        loadComponent: () => import('./features/movies/create/create').then(c => c.Create)
    },
    {
        path: 'movies',
        loadComponent: () => import('./features/movies/movies-catalog/movies').then(c => c.Movies)
    },
    {
        path: 'movies/:id',
        loadComponent: () => import('./features/movies/movies-item/movies-item').then(c => c.MoviesItem)
    },
    {
        path: 'movies/:id/edit',
        canActivate: [authGuard],
        loadComponent: () => import('./features/movies/movies-edit/movies-edit').then(c => c.MoviesEdit)
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./features/profile/profile/profile').then(c => c.Profile)
    },
    {
        path: 'logout',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'my-movies',
        canActivate: [authGuard],
        loadComponent: () => import('./features/movies/my-movies/my-movies').then(c=>c.MyMovies)
    },
    {
        path: '**',
        component: NotFount
    }

];