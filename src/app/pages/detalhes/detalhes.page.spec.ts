import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import type { Personagem } from '../../models/personagem.model';
import { FavoritosService } from '../../services/favoritos.service';

import { DetalhesPage } from './detalhes.page';

describe('DetalhesPage', () => {
  let component: DetalhesPage;
  let fixture: ComponentFixture<DetalhesPage>;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });

    fixture = TestBed.createComponent(DetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('alterna o favorito do personagem exibido', () => {
    const favoritos = TestBed.inject(FavoritosService);
    const rick = { id: 1, name: 'Rick Sanchez' } as Personagem;

    component.alternarFavorito(rick);
    expect(favoritos.ehFavorito(1)).toBe(true);

    component.alternarFavorito(rick);
    expect(favoritos.ehFavorito(1)).toBe(false);
  });
});
