import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'episodeCode',
  standalone: true,
})
export class EpisodeCodePipe implements PipeTransform {
  transform(codigo: string): string {
    const resultado = codigo.match(/^S(\d+)E(\d+)$/i);

    if (!resultado) {
      return codigo;
    }

    const temporada = resultado[1];
    const episodio = resultado[2];

    return `Temporada ${temporada} • Episódio ${episodio}`;
  }
}
