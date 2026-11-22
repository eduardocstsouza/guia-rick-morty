import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import type { Personagem } from '../../models/personagem.model';
import { FavoritosService } from '../../services/favoritos.service';
import { RickMortyApiService } from '../../services/rick-morty-api.service';

import { PersonagensPage } from './personagens.page';

describe('PersonagensPage', () => {
  let component: PersonagensPage;
  let fixture: ComponentFixture<PersonagensPage>;

  const rick = { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'img1' } as Personagem;
  const morty = { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: 'img2' } as Personagem;

  const mockApi = {
    getPersonagens: vi.fn().mockReturnValue(
      of({
        info: { count: 2, pages: 2, next: 'x', prev: null },
        results: [rick, morty],
      }),
    ),
  };

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [PersonagensPage],
      providers: [provideRouter([]), { provide: RickMortyApiService, useValue: mockApi }],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonagensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar personagens da API', () => {
    expect(component.personagens().length).toBe(2);
    expect(component.totalPaginas()).toBe(2);
  });

  it('deve ir para a próxima página', () => {
    component.proximo();

    expect(component.paginaAtual()).toBe(2);
  });

  it('deve voltar para a página anterior', () => {
    component.paginaAtual.set(2);
    component.anterior();

    expect(component.paginaAtual()).toBe(1);
  });

  it('deve favoritar e desfavoritar um personagem', () => {
    const favoritos = TestBed.inject(FavoritosService);

    component.alternarFavorito(rick);
    expect(favoritos.ehFavorito(1)).toBe(true);

    component.alternarFavorito(rick);
    expect(favoritos.ehFavorito(1)).toBe(false);
  });
});