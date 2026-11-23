import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import type { Personagem } from '../../models/personagem.model';
import { FavoritosService } from '../../services/favoritos.service';

import { FavoritosPage } from './favoritos.page';

describe('FavoritosPage', () => {
  let component: FavoritosPage;
  let fixture: ComponentFixture<FavoritosPage>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [FavoritosPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mostra o estado vazio quando não há favoritos', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Nenhum favorito salvo');
  });

  it('lista o personagem favoritado e volta ao vazio ao remover', () => {
    const favoritos = TestBed.inject(FavoritosService);
    const rick = { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'img' } as Personagem;

    favoritos.adicionar(rick);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Rick Sanchez');

    component.remover(1);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Nenhum favorito salvo');
  });
});
