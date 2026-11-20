import { Component } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.page.html',
  styleUrls: ['./episodios.page.scss'],
  imports: [
    IonBadge,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonTitle,
    IonToolbar,
  ],
})
export class EpisodiosPage {
  readonly episodiosExemplo = [
    { id: 1, codigo: 'S01E01', nome: 'Pilot', dataExibicao: 'December 2, 2013', personagens: 19 },
    { id: 2, codigo: 'S01E02', nome: 'Lawnmower Dog', dataExibicao: 'December 9, 2013', personagens: 19 },
  ];

  constructor() {
    addIcons({ chevronBackOutline, chevronForwardOutline });
  }
}
