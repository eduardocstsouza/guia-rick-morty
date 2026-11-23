import type { OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import type { ParamMap } from '@angular/router';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonBadge,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import type { Subscription } from 'rxjs';

import { StatusBadgeDirective } from '../../directives/status-badge.directive';
import type { Personagem } from '../../models/personagem.model';
import { EspeciePtPipe } from '../../pipes/especie-pt.pipe';
import { GeneroPtPipe } from '../../pipes/genero-pt.pipe';
import { StatusPtPipe } from '../../pipes/status-pt.pipe';
import { FavoritosService } from '../../services/favoritos.service';
import { RickMortyApiService } from '../../services/rick-morty-api.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonBadge,
    IonIcon,
    StatusBadgeDirective,
    StatusPtPipe,
    EspeciePtPipe,
    GeneroPtPipe,
  ],
})
export class DetalhesPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private api = inject(RickMortyApiService);
  private cdr = inject(ChangeDetectorRef);
  protected readonly favoritosService = inject(FavoritosService);
  private sub?: Subscription;

  personagem?: Personagem;
  carregando = true;
  erro = '';

  constructor() {
    addIcons({ heart, heartOutline });
  }

  alternarFavorito(personagem: Personagem): void {
    this.favoritosService.alternar(personagem);
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      this.carregar(id);
    });
  }

  carregar(id: number): void {
    this.carregando = true;
    this.personagem = undefined;
    this.erro = '';

    this.api.getPersonagem(id).subscribe({
      next: (p) => {
        this.personagem = p;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = 'Erro ao carregar personagem';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
