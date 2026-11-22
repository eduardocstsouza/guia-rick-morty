import { UpperCasePipe, DatePipe } from '@angular/common';
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

import { DestaqueDirective } from '../../directives/destaque.directive';
import { EpisodeCodePipe } from '../../pipes/episode-code.pipe';

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
    EpisodeCodePipe,
    UpperCasePipe,
    DatePipe,
    DestaqueDirective,
  ],
})
export class EpisodiosPage {
  readonly episodiosExemplo = [
    {
      id: 1,
      codigo: 'S01E01',
      nome: 'Pilot',
      dataExibicao: new Date(2013, 11, 2),
      personagens: 19,
    },
    {
      id: 2,
      codigo: 'S01E02',
      nome: 'Lawnmower Dog',
      dataExibicao: new Date(2013, 11, 9),
      personagens: 19,
    },
  ];

  constructor() {
    addIcons({ chevronBackOutline, chevronForwardOutline });
  }
}
