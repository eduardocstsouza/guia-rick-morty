import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import type { Episodio } from '../../models/episodio.model';
import { RickMortyApiService } from '../../services/rick-morty-api.service';

import { EpisodiosPage } from './episodios.page';

describe('EpisodiosPage', () => {
  let component: EpisodiosPage;
  let fixture: ComponentFixture<EpisodiosPage>;

  const episodio = {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: ['a', 'b'],
  } as Episodio;

  const mockApi = {
    getEpisodios: vi
      .fn()
      .mockReturnValue(of({ info: { count: 51, pages: 3, next: 'x', prev: null }, results: [episodio] })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodiosPage],
      providers: [{ provide: RickMortyApiService, useValue: mockApi }],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('carrega os episódios da API', () => {
    expect(component.episodios().length).toBe(1);
    expect(component.totalPaginas()).toBe(3);
  });

  it('vai para a próxima página e volta', () => {
    component.proximo();
    expect(component.paginaAtual()).toBe(2);

    component.anterior();
    expect(component.paginaAtual()).toBe(1);
  });
});
