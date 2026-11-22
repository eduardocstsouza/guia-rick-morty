import { Injectable, computed, signal } from '@angular/core';

import type { Personagem } from '../models/personagem.model';

export const CHAVE_FAVORITOS = 'guia-rick-morty:favoritos';

function ehPersonagemValido(item: unknown): item is Personagem {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as Personagem).id === 'number' &&
    typeof (item as Personagem).name === 'string'
  );
}

/**
 * Guarda os favoritos no localStorage e os expõe como signal.
 * Como o service é um singleton (providedIn: 'root'), todas as telas leem
 * o MESMO signal: favoritar em uma tela atualiza as outras na hora.
 */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly lista = signal<Personagem[]>(this.lerDoStorage());
  private readonly ids = computed(() => new Set(this.lista().map((personagem) => personagem.id)));

  /** Lista de favoritos (somente leitura para quem consome). */
  readonly favoritos = this.lista.asReadonly();

  /** Quantidade de favoritos (contador da Home). */
  readonly total = computed(() => this.lista().length);

  ehFavorito(id: number): boolean {
    return this.ids().has(id);
  }

  adicionar(personagem: Personagem): void {
    if (this.ehFavorito(personagem.id)) {
      return;
    }
    this.atualizar([...this.lista(), personagem]);
  }

  remover(id: number): void {
    if (!this.ehFavorito(id)) {
      return;
    }
    this.atualizar(this.lista().filter((personagem) => personagem.id !== id));
  }

  alternar(personagem: Personagem): void {
    if (this.ehFavorito(personagem.id)) {
      this.remover(personagem.id);
    } else {
      this.adicionar(personagem);
    }
  }

  private atualizar(novaLista: Personagem[]): void {
    this.lista.set(novaLista);
    this.gravarNoStorage(novaLista);
  }

  private lerDoStorage(): Personagem[] {
    try {
      const bruto = localStorage.getItem(CHAVE_FAVORITOS);
      if (!bruto) {
        return [];
      }

      const dados: unknown = JSON.parse(bruto);

      return Array.isArray(dados) ? dados.filter(ehPersonagemValido) : [];
    } catch {
      // JSON corrompido ou localStorage indisponível: começa com a lista vazia.
      return [];
    }
  }

  private gravarNoStorage(lista: Personagem[]): void {
    try {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(lista));
    } catch {
      // Cota cheia ou modo privado: o app continua funcionando só em memória.
    }
  }
}