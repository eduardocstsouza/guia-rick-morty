import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RickMortyApiService } from './rick-morty-api.service';

const BASE = 'https://rickandmortyapi.com/api';
const RESPOSTA_VAZIA = { info: { count: 826, pages: 42, next: null, prev: null }, results: [] };

describe('RickMortyApiService', () => {
  let service: RickMortyApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(RickMortyApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('getPersonagens envia page, name e status (com o nome codificado)', () => {
    service.getPersonagens(2, 'rick & morty', 'alive').subscribe();

    const req = http.expectOne((r) => r.url === `${BASE}/character`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('name')).toBe('rick & morty');
    expect(req.request.params.get('status')).toBe('alive');
    expect(req.request.urlWithParams).toContain('name=rick%20%26%20morty');
    req.flush(RESPOSTA_VAZIA);
  });

  it('getPersonagens não envia name nem status quando vazios ou "todos"', () => {
    service.getPersonagens(1, '  ', 'todos').subscribe();

    const req = http.expectOne((r) => r.url === `${BASE}/character`);
    expect(req.request.params.has('name')).toBe(false);
    expect(req.request.params.has('status')).toBe(false);
    req.flush(RESPOSTA_VAZIA);
  });

  it('getPersonagem busca pelo id', () => {
    service.getPersonagem(5).subscribe();

    const req = http.expectOne(`${BASE}/character/5`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('getEpisodios envia a página pedida', () => {
    service.getEpisodios(3).subscribe();

    const req = http.expectOne((r) => r.url === `${BASE}/episode`);
    expect(req.request.params.get('page')).toBe('3');
    req.flush(RESPOSTA_VAZIA);
  });

  it('getTotalPersonagens devolve só o count da resposta', () => {
    let total = 0;
    service.getTotalPersonagens().subscribe((valor) => (total = valor));

    http.expectOne((r) => r.url === `${BASE}/character`).flush(RESPOSTA_VAZIA);
    expect(total).toBe(826);
  });
});
