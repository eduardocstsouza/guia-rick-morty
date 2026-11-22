import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonContent, IonSpinner, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton
} from '@ionic/angular';
import { RickMortyApiService } from '../../services/rick-morty-api.service';
import { Personagem } from '../../models/personagem.model';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
    IonContent, IonSpinner, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonButton
  ],
})
export class DetalhesPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private api = inject(RickMortyApiService);
  private sub?: Subscription;

  personagem?: Personagem;
  carregando = true;
  erro = '';

  ngOnInit() {
    // Fica ouvindo TODA vez que o ID na URL muda
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      this.carregar(id);
    });
  }

  carregar(id: number) {
    this.carregando = true;
    this.personagem = undefined;
    this.erro = '';

    this.api.getPersonagem(id).subscribe({
      next: (p) => { this.personagem = p; this.carregando = false; },
      error: () => { this.erro = 'Erro ao carregar personagem'; this.carregando = false; }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}