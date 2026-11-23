import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heartOutline, peopleOutline, planetOutline, tvOutline } from 'ionicons/icons';

import { DestaqueDirective } from '../../directives/destaque.directive';
import { FavoritosService } from '../../services/favoritos.service';
import { RickMortyApiService } from '../../services/rick-morty-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    RouterLink,
    DestaqueDirective,
  ],
})
export class HomePage implements OnInit {
  private readonly api = inject(RickMortyApiService);
  protected readonly favoritosService = inject(FavoritosService);

  /** null enquanto carrega (ou se a API falhar): a tela mostra "—". */
  protected readonly totalPersonagens = signal<number | null>(null);

  readonly atalhos = [
    {
      titulo: 'Personagens',
      descricao: 'Explore todos os personagens',
      rota: '/personagens',
      icone: 'people-outline',
      cor: 'primary',
    },
    {
      titulo: 'Episódios',
      descricao: 'Confira a lista completa dos episódios',
      rota: '/episodios',
      icone: 'tv-outline',
      cor: 'secondary',
    },
    {
      titulo: 'Favoritos',
      descricao: 'Acesse seus personagens favoritados',
      rota: '/favoritos',
      icone: 'heart-outline',
      cor: 'tertiary',
    },
  ];

  constructor() {
    addIcons({ planetOutline, peopleOutline, tvOutline, heartOutline });
  }

  ngOnInit(): void {
    this.api.getTotalPersonagens().subscribe({
      next: (total) => this.totalPersonagens.set(total),
      error: () => this.totalPersonagens.set(null),
    });
  }
}
