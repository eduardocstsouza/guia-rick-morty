import { computed, Directive, input } from '@angular/core';

@Directive({
  selector: 'ion-badge[appStatusBadge]',
  host: {
    '[attr.color]': 'cor()',
  },
})
export class StatusBadgeDirective {
  readonly appStatusBadge = input.required<string>();

  protected readonly cor = computed(() => {
    switch (this.appStatusBadge().toLowerCase()) {
      case 'alive':
        return 'success';
      case 'dead':
        return 'danger';
      default:
        return 'medium';
    }
  });
}
