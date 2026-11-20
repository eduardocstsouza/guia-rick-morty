import { Component } from '@angular/core';
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
  ],
})
export class HomePage {
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
}
