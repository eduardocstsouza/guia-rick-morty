import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';

import type { Episodio } from '../models/episodio.model';
import type { Personagem } from '../models/personagem.model';
import type { RespostaPaginada } from '../models/resposta-paginada.model';

/**
 * Único ponto do app que fala com a Rick and Morty API.
 * As pages nunca injetam HttpClient: elas injetam este service.
 */
@Injectable({ providedIn: 'root' })
export class RickMortyApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  /** GET /character?page=&name=&status= (busca sem resultado volta 404; quem chama trata). */
  getPersonagens(pagina = 1, nome = '', status = ''): Observable<RespostaPaginada<Personagem>> {
    // HttpParams codifica o valor (ex.: "rick & morty" ou "é"), evitando URL quebrada.
    let params = new HttpParams().set('page', pagina);
    const termo = nome.trim();

    if (termo) {
      params = params.set('name', termo);
    }
    if (status && status !== 'todos') {
      params = params.set('status', status);
    }

    return this.http.get<RespostaPaginada<Personagem>>(`${this.baseUrl}/character`, { params });
  }

  /** GET /character/{id} */
  getPersonagem(id: number): Observable<Personagem> {
    return this.http.get<Personagem>(`${this.baseUrl}/character/${id}`);
  }

  /** GET /episode?page= */
  getEpisodios(pagina = 1): Observable<RespostaPaginada<Episodio>> {
    const params = new HttpParams().set('page', pagina);

    return this.http.get<RespostaPaginada<Episodio>>(`${this.baseUrl}/episode`, { params });
  }

  /** Total de personagens da API (usado no contador da Home). */
  getTotalPersonagens(): Observable<number> {
    return this.getPersonagens(1).pipe(map((resposta) => resposta.info.count));
  }
}
