import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heartOutline, homeOutline, peopleOutline, tvOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet,
    IonTitle,
    IonToolbar,
    RouterLink,
    RouterLinkActive,
  ],
})
export class AppComponent {
  readonly paginas = [
    { titulo: 'Início', url: '/home', icone: 'home-outline' },
    { titulo: 'Personagens', url: '/personagens', icone: 'people-outline' },
    { titulo: 'Episódios', url: '/episodios', icone: 'tv-outline' },
    { titulo: 'Favoritos', url: '/favoritos', icone: 'heart-outline' },
  ];

  constructor() {
    addIcons({ homeOutline, peopleOutline, tvOutline, heartOutline });
  }
}
