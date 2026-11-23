import { DatePipe, UpperCasePipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
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
import type { Episodio } from '../../models/episodio.model';
import { EpisodeCodePipe } from '../../pipes/episode-code.pipe';
import { RickMortyApiService } from '../../services/rick-morty-api.service';

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
export class EpisodiosPage implements OnInit {
  private readonly api = inject(RickMortyApiService);

  readonly episodios = signal<Episodio[]>([]);
  readonly paginaAtual = signal(1);
  readonly totalPaginas = signal(1);
  readonly carregando = signal(false);
  readonly erro = signal('');

  constructor() {
    addIcons({ chevronBackOutline, chevronForwardOutline });
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set('');
    this.episodios.set([]);

    this.api.getEpisodios(this.paginaAtual()).subscribe({
      next: (resposta) => {
        this.episodios.set(resposta.results);
        this.totalPaginas.set(resposta.info.pages);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar episódios. Tente novamente.');
        this.carregando.set(false);
      },
    });
  }

  proximo(): void {
    if (this.paginaAtual() < this.totalPaginas()) {
      this.paginaAtual.update((pagina) => pagina + 1);
      this.carregar();
    }
  }

  anterior(): void {
    if (this.paginaAtual() > 1) {
      this.paginaAtual.update((pagina) => pagina - 1);
      this.carregar();
    }
  }
}
