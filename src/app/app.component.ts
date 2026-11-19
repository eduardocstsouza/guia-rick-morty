import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonRouterOutlet, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from '@ionic/angular';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-root',
  styleUrls:['app.component.scss'],
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, RouterLink, RouterLinkActive, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar],
})
export class AppComponent {
  constructor() {}
}
