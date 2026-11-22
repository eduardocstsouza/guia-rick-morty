import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonagensPage } from './personagens.page';
import { RickMortyApiService } from '../../services/rick-morty-api.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('PersonagensPage', () => {
  let component: PersonagensPage;
  let fixture: ComponentFixture<PersonagensPage>;

  const mockService = {
    getPersonagens: jasmine.createSpy('getPersonagens').and.returnValue(
      of({
        info: { count: 2, pages: 2, next: 'x', prev: null },
        results: [
          { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'img1' },
          { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: 'img2' },
        ],
      })
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonagensPage],
      providers: [
        provideRouter([]),
        { provide: RickMortyApiService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonagensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar personagens da API', () => {
    expect(component.personagens.length).toBe(2);
    expect(component.totalPaginas).toBe(2);
  });

  it('deve ir para proxima pagina', () => {
    component.proximo();
    expect(component.paginaAtual).toBe(2);
  });

  it('deve voltar para pagina anterior', () => {
    component.paginaAtual = 2;
    component.anterior();
    expect(component.paginaAtual).toBe(1);
  });
});