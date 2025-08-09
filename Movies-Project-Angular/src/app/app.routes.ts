import { Routes } from '@angular/router';

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
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
    {
        path: 'create',
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
        loadComponent: () => import('./features/movies/movies-edit/movies-edit').then(c => c.MoviesEdit)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile/profile').then(c => c.Profile)
    },
    {
        path: 'logout',
        redirectTo: '/home',
        pathMatch: 'full'
    }

];