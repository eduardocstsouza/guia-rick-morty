import { CommonModule } from '@angular/common';
import type { HttpErrorResponse } from '@angular/common/http';
import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { chevronBackOutline, chevronForwardOutline, heart, heartOutline } from 'ionicons/icons';

import { DestaqueDirective } from '../../directives/destaque.directive';
import { StatusBadgeDirective } from '../../directives/status-badge.directive';
import type { Personagem } from '../../models/personagem.model';
import { EspeciePtPipe } from '../../pipes/especie-pt.pipe';
import { StatusPtPipe } from '../../pipes/status-pt.pipe';
import { FavoritosService } from '../../services/favoritos.service';
import { RickMortyApiService } from '../../services/rick-morty-api.service';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.page.html',
  styleUrls: ['./personagens.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
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
    EspeciePtPipe,
    StatusBadgeDirective,
    DestaqueDirective,
  ],
})
export class PersonagensPage implements OnInit {
  private api = inject(RickMortyApiService);
  protected readonly favoritosService = inject(FavoritosService);

  personagens = signal<Personagem[]>([]);
  termoBusca = signal('');
  filtroStatus = signal('todos');
  paginaAtual = signal(1);
  totalPaginas = signal(1);
  carregando = signal(false);
  erro = signal('');

  private requisicaoAtual = 0;
  private timerBusca: any;

  constructor() {
    addIcons({ chevronBackOutline, chevronForwardOutline, heart, heartOutline });
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.personagens.set([]);
    this.erro.set('');
    this.requisicaoAtual++;
    const minhaRequisicao = this.requisicaoAtual;

    this.api.getPersonagens(this.paginaAtual(), this.termoBusca(), this.filtroStatus()).subscribe({
      next: (res) => {
        if (minhaRequisicao !== this.requisicaoAtual) return;
        this.personagens.set(res.results);
        this.totalPaginas.set(res.info.pages);
        this.carregando.set(false);
      },
      error: (error: HttpErrorResponse) => {
        if (minhaRequisicao !== this.requisicaoAtual) return;
        this.totalPaginas.set(1);
        this.erro.set(error.status === 404 ? '' : 'Erro ao carregar personagens. Tente novamente.');
        this.carregando.set(false);
      },
    });
  }

  onBusca(event: any): void {
    this.termoBusca.set(event.detail.value ?? '');
    clearTimeout(this.timerBusca);
    this.timerBusca = setTimeout(() => {
      this.paginaAtual.set(1);
      this.carregar();
    }, 400);
  }

  // AGORA É CLICK DIRETO, SEM ionChange, SEM EVENTO
  trocarStatus(novoStatus: string): void {
    if (this.filtroStatus() === novoStatus) return;
    clearTimeout(this.timerBusca);
    this.filtroStatus.set(novoStatus);
    this.paginaAtual.set(1);
    this.carregar();
  }

  alternarFavorito(personagem: Personagem): void {
    this.favoritosService.alternar(personagem);
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
