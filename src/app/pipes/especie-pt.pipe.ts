import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'especiePt',
  standalone: true,
})
export class EspeciePtPipe implements PipeTransform {
  transform(especie: string): string {
    const traducoes: Record<string, string> = {
      human: 'Humano',
      alien: 'Alienígena',
      humanoid: 'Humanoide',
      poopybutthole: 'Poopybutthole',
      mythological: 'Mitológico',
      animal: 'Animal',
      robot: 'Robô',
      cronenberg: 'Cronenberg',
      disease: 'Doença',
      unknown: 'Desconhecida',
    };

    return traducoes[especie?.toLowerCase()] ?? especie;
  }
}