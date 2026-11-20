import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'personagens',
    loadComponent: () => import('./pages/personagens/personagens.page').then((m) => m.PersonagensPage),
  },
  {
    path: 'personagens/:id',
    loadComponent: () => import('./pages/detalhes/detalhes.page').then((m) => m.DetalhesPage),
  },
  {
    path: 'episodios',
    loadComponent: () => import('./pages/episodios/episodios.page').then((m) => m.EpisodiosPage),
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos.page').then((m) => m.FavoritosPage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
