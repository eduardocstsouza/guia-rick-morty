import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'statusPt',
  standalone: true,
})
export class StatusPtPipe implements PipeTransform {
  transform(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'Vivo';

      case 'dead':
        return 'Morto';

      case 'unknown':
        return 'Desconhecido';

      default:
        return status;
    }
  }
}
