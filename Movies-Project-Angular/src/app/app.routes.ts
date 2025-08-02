import { Routes } from '@angular/router';
import path from 'path';

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
    path: 'logout',
    redirectTo: '/home',
    pathMatch: 'full'
    },
   
];
