import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () => import('./src/home-component/home-component.component').then(m => m.HomeComponentComponent)
  },
  {
    path: 'blog/new',
    loadComponent: () => import('./src/newblog-component/newblog-component.component').then(m => m.NewblogComponentComponent)
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./src/blog-component/blog-component.component').then(m => m.BlogComponentComponent)
  },
];
