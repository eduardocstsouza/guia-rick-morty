import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personagem } from '../models/personagem.model';

export interface RespostaApi {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: Personagem[];
}

@Injectable({ providedIn: 'root' })
export class RickMortyApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://rickandmortyapi.com/api';

  // LISTA - É ESSE QUE FALTAVA
  getPersonagens(pagina = 1, nome = '', status = ''): Observable<RespostaApi> {
    let url = `${this.baseUrl}/character/?page=${pagina}`;
    if (nome) url += `&name=${nome}`;
    if (status && status !== 'todos') url += `&status=${status}`;
    return this.http.get<RespostaApi>(url);
  }

  // DETALHE - ESSE VOCÊ JÁ TINHA, MANTÉM
  getPersonagem(id: number): Observable<Personagem> {
    return this.http.get<Personagem>(`${this.baseUrl}/character/${id}`);
  }
}