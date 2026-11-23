import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'generoPt',
  standalone: true,
})
export class GeneroPtPipe implements PipeTransform {
  transform(genero: string): string {
    const traducoes: Record<string, string> = {
      male: 'Masculino',
      female: 'Feminino',
      genderless: 'Sem gênero',
      unknown: 'Desconhecido',
    };

    return traducoes[genero?.toLowerCase()] ?? genero;
  }
}
