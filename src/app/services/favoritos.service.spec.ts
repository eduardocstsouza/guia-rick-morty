import { TestBed } from '@angular/core/testing';

import type { Personagem } from '../models/personagem.model';

import { CHAVE_FAVORITOS, FavoritosService } from './favoritos.service';

function criarPersonagem(id: number, name = `Personagem ${id}`): Personagem {
  return {
    id,
    name,
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
    episode: [],
    url: '',
    created: '2017-11-04T18:48:46.250Z',
  };
}

describe('FavoritosService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('começa vazio quando não há nada salvo', () => {
    const service = TestBed.inject(FavoritosService);

    expect(service.favoritos()).toEqual([]);
    expect(service.total()).toBe(0);
  });

  it('alternar adiciona e depois remove o personagem', () => {
    const service = TestBed.inject(FavoritosService);
    const rick = criarPersonagem(1, 'Rick Sanchez');

    service.alternar(rick);
    expect(service.ehFavorito(1)).toBe(true);
    expect(service.total()).toBe(1);

    service.alternar(rick);
    expect(service.ehFavorito(1)).toBe(false);
    expect(service.total()).toBe(0);
  });

  it('não duplica o mesmo personagem', () => {
    const service = TestBed.inject(FavoritosService);

    service.adicionar(criarPersonagem(1));
    service.adicionar(criarPersonagem(1));

    expect(service.total()).toBe(1);
  });

  it('grava a lista no localStorage a cada mudança', () => {
    const service = TestBed.inject(FavoritosService);

    service.adicionar(criarPersonagem(1));
    service.adicionar(criarPersonagem(2));
    service.remover(1);

    const gravado = JSON.parse(localStorage.getItem(CHAVE_FAVORITOS) ?? '[]') as Personagem[];
    expect(gravado.map((personagem) => personagem.id)).toEqual([2]);
  });

  it('recupera os favoritos salvos (simula recarregar a página)', () => {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([criarPersonagem(7, 'Morty Smith')]));

    const service = TestBed.inject(FavoritosService);

    expect(service.ehFavorito(7)).toBe(true);
    expect(service.favoritos()[0].name).toBe('Morty Smith');
  });

  it('ignora JSON corrompido sem quebrar o app', () => {
    localStorage.setItem(CHAVE_FAVORITOS, '{isso-nao-e-json');

    const service = TestBed.inject(FavoritosService);

    expect(service.favoritos()).toEqual([]);
  });

  it('descarta itens inválidos e mantém os válidos', () => {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([criarPersonagem(3), { foo: 'bar' }, 'texto', null]));

    const service = TestBed.inject(FavoritosService);

    expect(service.total()).toBe(1);
    expect(service.ehFavorito(3)).toBe(true);
  });

  it('continua funcionando em memória se o localStorage falhar ao gravar', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('cota excedida');
    });
    const service = TestBed.inject(FavoritosService);

    expect(() => service.adicionar(criarPersonagem(1))).not.toThrow();
    expect(service.ehFavorito(1)).toBe(true);
  });
});