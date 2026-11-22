import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);
  private sub?: Subscription;

  personagem?: Personagem;
  carregando = true;
  erro = '';

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      console.log('ID da URL:', id);
      this.carregar(id);
    });
  }

  carregar(id: number) {
    this.carregando = true;
    this.personagem = undefined;
    this.erro = '';

    this.api.getPersonagem(id).subscribe({
      next: (p) => {
        console.log('CHEGOU:', p);
        this.personagem = p;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.log('ERRO API:', e);
        this.erro = 'Erro ao carregar personagem';
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}