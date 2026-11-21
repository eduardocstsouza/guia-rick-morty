import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline, heartOutline } from 'ionicons/icons';

import { StatusPtPipe } from '../../pipes/status-pt.pipe';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.page.html',
  styleUrls: ['./personagens.page.scss'],
  imports: [
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonLabel,
    IonMenuButton,
    IonRow,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar,
    RouterLink,
    StatusPtPipe,
  ],
})
export class PersonagensPage {
  readonly personagensExemplo = [
    {
      id: 1,
      nome: 'Rick Sanchez',
      especie: 'Human',
      status: 'Alive',
      imagem: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    {
      id: 2,
      nome: 'Morty Smith',
      especie: 'Human',
      status: 'Alive',
      imagem: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
  ];

  constructor() {
    addIcons({ chevronBackOutline, chevronForwardOutline, heartOutline });
  }
}
