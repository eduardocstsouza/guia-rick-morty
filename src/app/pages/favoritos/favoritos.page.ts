import { Component, inject } from '@angular/core';
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
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartDislikeOutline, peopleOutline } from 'ionicons/icons';

import { DestaqueDirective } from '../../directives/destaque.directive';
import { StatusBadgeDirective } from '../../directives/status-badge.directive';
import { EspeciePtPipe } from '../../pipes/especie-pt.pipe';
import { StatusPtPipe } from '../../pipes/status-pt.pipe';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
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
    IonMenuButton,
    IonRow,
    IonTitle,
    IonToolbar,
    RouterLink,
    DestaqueDirective,
    StatusBadgeDirective,
    StatusPtPipe,
    EspeciePtPipe,
  ],
})
export class FavoritosPage {
  protected readonly favoritosService = inject(FavoritosService);

  constructor() {
    addIcons({ heart, heartDislikeOutline, peopleOutline });
  }

  remover(id: number): void {
    this.favoritosService.remover(id);
  }
}