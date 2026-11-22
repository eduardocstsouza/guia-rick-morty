import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personagem } from '../models/personagem.model';

@Injectable({ providedIn: 'root' })
export class RickMortyApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://rickandmortyapi.com/api';

  getPersonagem(id: number): Observable<Personagem> {
    return this.http.get<Personagem>(`${this.baseUrl}/character/${id}`);
  }
}