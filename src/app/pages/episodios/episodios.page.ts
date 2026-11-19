import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.page.html',
  styleUrls: ['./episodios.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar],
})
export class EpisodiosPage {
  constructor() {}
}
