import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.page.html',
  styleUrls: ['./personagens.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar],
})
export class PersonagensPage {
  constructor() {}
}
