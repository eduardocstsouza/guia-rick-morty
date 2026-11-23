import type { OnDestroy } from '@angular/core';
import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[appDestaque]',
  host: {
    class: 'app-destaque',
    '[class.app-destaque-ativo]': 'ativo()',
    '(pointerenter)': 'aoEntrar($event)',
    '(pointerleave)': 'aoSair($event)',
    '(pointerdown)': 'aoPressionar($event)',
    '(pointerup)': 'aoSoltar($event)',
    '(pointercancel)': 'aoCancelar()',
  },
})
export class DestaqueDirective implements OnDestroy {
  protected readonly ativo = signal(false);
  private sobre = false;
  private pressionado = false;
  private temporizador?: ReturnType<typeof setTimeout>;

  protected aoEntrar(evento: PointerEvent): void {
    if (evento.pointerType !== 'touch') {
      this.sobre = true;
      this.atualizar();
    }
  }

  protected aoSair(evento: PointerEvent): void {
    if (evento.pointerType !== 'touch') {
      this.sobre = false;
      this.atualizar();
    }
  }

  protected aoPressionar(evento: PointerEvent): void {
    if (evento.pointerType === 'touch') {
      clearTimeout(this.temporizador);
      this.pressionado = true;
      this.atualizar();
    }
  }

  protected aoSoltar(evento: PointerEvent): void {
    if (evento.pointerType === 'touch') {
      this.temporizador = setTimeout(() => {
        this.pressionado = false;
        this.atualizar();
      }, 250);
    }
  }

  protected aoCancelar(): void {
    clearTimeout(this.temporizador);
    this.pressionado = false;
    this.atualizar();
  }

  ngOnDestroy(): void {
    clearTimeout(this.temporizador);
  }

  private atualizar(): void {
    this.ativo.set(this.sobre || this.pressionado);
  }
}
