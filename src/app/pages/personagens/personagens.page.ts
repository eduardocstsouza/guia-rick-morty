import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonMenuButton, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline, heartOutline } from 'ionicons/icons';
import { DestaqueDirective } from '../../directives/destaque.directive';
import { StatusBadgeDirective } from '../../directives/status-badge.directive';
import { RickMortyApiService } from '../../services/rick-morty-api.service';
import { Personagem } from '../../models/personagem.model';
import { StatusPtPipe } from '../../pipes/status-pt.pipe';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.page.html',
  styleUrls: ['./personagens.page.scss'],
  imports: [CommonModule, FormsModule, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonMenuButton, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar, RouterLink, StatusPtPipe, StatusBadgeDirective, DestaqueDirective],
})
export class PersonagensPage implements OnInit {
  private api = inject(RickMortyApiService);

  personagens: Personagem[] = [];
  termoBusca = '';
  filtroStatus = 'todos';
  paginaAtual = 1;
  totalPaginas = 1;
  carregando = false;

  private requisicaoAtual = 0;
  private timerBusca: any;

  constructor() {
    addIcons({ chevronBackOutline, chevronForwardOutline, heartOutline });
  }

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.carregando = true;
    this.requisicaoAtual++;
    const minhaRequisicao = this.requisicaoAtual;

    this.api.getPersonagens(this.paginaAtual, this.termoBusca, this.filtroStatus).subscribe({
      next: (res) => {
        if (minhaRequisicao !== this.requisicaoAtual) return;
        this.personagens = res.results;
        this.totalPaginas = res.info.pages;
        this.carregando = false;
      },
      error: () => {
        if (minhaRequisicao !== this.requisicaoAtual) return;
        this.personagens = [];
        this.totalPaginas = 1;
        this.carregando = false;
      }
    });
  }

  onBusca(event: any) {
    this.termoBusca = event.detail.value ?? '';
    clearTimeout(this.timerBusca);
    this.timerBusca = setTimeout(() => {
      this.paginaAtual = 1;
      this.carregar();
    }, 400);
  }

  // AGORA É CLICK DIRETO, SEM ionChange, SEM EVENTO
  trocarStatus(novoStatus: string) {
    if (this.filtroStatus === novoStatus) return;
    this.filtroStatus = novoStatus;
    this.paginaAtual = 1;
    this.carregar();
  }

  proximo() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregar();
    }
  }

  anterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregar();
    }
  }
}
