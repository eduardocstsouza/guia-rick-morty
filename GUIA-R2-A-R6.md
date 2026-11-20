# Guia de Continuidade — R1 Concluído → R2 a R6

Este documento resume o que foi entregue no **R1** (estrutura base, rotas, tema e 5 páginas estilizadas) e traz os contratos e cuidados técnicos para os integrantes de **R2, R3, R4, R5 e R6** desenvolverem em paralelo sem conflitos.

---

## 1. O que já está pronto no R1

- **Arquitetura 100% Standalone e Zoneless** (`src/main.ts` já possui `provideHttpClient()`, `provideIonicAngular()` e `provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding())`).
- **Pastas criadas em `src/app/`** (com `.gitkeep` nas vazias para evitar conflitos):
  - `pages/` (`home`, `personagens`, `detalhes`, `episodios`, `favoritos`)
  - `components/` (vazia — pronta para `personagem-card`)
  - `services/` (vazia — pronta para `rick-morty-api.service.ts` e `favoritos.service.ts`)
  - `pipes/` (vazia — pronta para `status-pt.pipe.ts` e `episode-code.pipe.ts`)
  - `directives/` (vazia — pronta para `status-badge.directive.ts` e `destaque.directive.ts`)
  - `models/` (vazia — pronta para `personagem.model.ts`, `episodio.model.ts`, `resposta-paginada.model.ts`)
- **Rotas configuradas em `src/app/app.routes.ts`** (todas com *lazy loading* via `loadComponent`):
  - `''` → redireciona para `'home'`
  - `'home'` → `HomePage`
  - `'personagens'` → `PersonagensPage`
  - `'personagens/:id'` → `DetalhesPage` (pronta para o R6)
  - `'episodios'` → `EpisodiosPage`
  - `'favoritos'` → `FavoritosPage`
  - `'**'` → redireciona para `'home'`
- **Menu lateral global** em `src/app/app.component.*` e **Tema escuro Rick & Morty** em `src/theme/variables.scss` + `src/global.scss`.
- **5 páginas estilizadas** com dados/espaços de exemplo prontos para serem substituídos pelos dados reais.

---

## 2. Regras Obrigatórias da Stack (Leia antes de criar arquivos!)

1. **Ionic 9 (`@ionic/angular` `9.0.12`):**
   - Importe todos os componentes e providers diretamente de `'@ionic/angular'`.
   - **NUNCA** importe de `'@ionic/angular/standalone'` (esse caminho foi removido no Ionic 9 e quebra o build).
2. **Ícones (`ionicons` `8.1.0`):**
   - Todo `<ion-icon name="...">` precisa do ícone importado de `'ionicons/icons'` (camelCase) e registrado no `constructor()` com `addIcons({ ... })` (de `'ionicons'`).
3. **Angular 22 Zoneless (sem `zone.js`):**
   - **Não** atualize propriedades comuns dentro de `.subscribe(...)` esperando que a tela mude sozinha.
   - Use sempre **`signal()`** e **`computed()`** (ex.: `personagens = signal<Personagem[]>([]);`, `carregando = signal(false);`, `erro = signal('');`).
4. **Control Flow moderno:**
   - **PROIBIDO** usar `*ngIf` ou `*ngFor`. Use exclusivamente **`@if`** e **`@for (...; track ...)`**.
5. **Comandos Angular CLI 22 para manter sufixos exigidos pelo ESLint:**
   ```bash
   ng generate component components/personagem-card --type=component --skip-tests
   ng generate service services/rick-morty-api --type=service --skip-tests
   ng generate service services/favoritos --type=service --skip-tests
   ng generate pipe pipes/status-pt --type-separator=. --skip-tests
   ng generate pipe pipes/episode-code --type-separator=. --skip-tests
   ng generate directive directives/status-badge --type=directive --skip-tests
   ng generate directive directives/destaque --type=directive --skip-tests
   ```
6. **ESLint rígido (`--max-warnings 0`):**
   - Antes de abrir PR para `dev`, rode sempre:
     `npm run lint:fix` → `npm run lint` → `npm run build` → `npm run test:unit`.

---

## 3. Contratos e Cuidados da Rick and Morty API (`R2` a `R6`)

- **Base URL:** `https://rickandmortyapi.com/api` (somente `GET`, sem autenticação/token).
- **3 endpoints mínimos para R2:**
  1. `GET /character?page=1&name=...&status=...` (usado em `PersonagensPage`)
  2. `GET /character/{id}` (usado em `DetalhesPage` / R6)
  3. `GET /episode?page=1` (usado em `EpisodiosPage`)
- **Pegadinhas confirmadas da API (tratar no código!):**
  - **Busca sem resultado retorna HTTP `404`:** ao filtrar `?name=zzzz`, a API responde `404 Not Found` (`{ "error": "There is nothing here" }`) em vez de `200` com `results: []`. Trate `err.status === 404` no `catchError`/`.subscribe` limpando a lista (`[]`) para exibir `@empty` sem mostrar erro de servidor.
  - **Campo `type` pode vir vazio (`""`):** exiba um fallback amigável no HTML (ex.: `personagem.type || 'Não informado'`).
  - **Datas (`created` vs `air_date`):** `created` vem em formato ISO (`2017-11-04T18:48:46.250Z`) — use **este** campo com o pipe built-in `date:'dd/MM/yyyy'`. O campo `air_date` vem como texto em inglês (`"December 2, 2013"`).
  - **R6 (`DetalhesPage`):** `withComponentInputBinding()` já está ativo em `src/main.ts` e `readonly id = input<string>();` já está declarado em `detalhes.page.ts`. Converta `Number(this.id())` para chamar `getPersonagem(id)` (ou use `ActivatedRoute.paramMap` se preferir).
- **Favoritos (`R4` — `FavoritosService`):**
  - Usar `localStorage` com `try/catch` ao fazer `JSON.parse` e expor a lista via `signal<Personagem[]>([])` para atualizar `HomePage`, `PersonagensPage`, `DetalhesPage` e `FavoritosPage` automaticamente.

---

## 4. Fluxo Git do Grupo

- Sempre crie sua branch a partir da **`dev` atualizada** (`git checkout dev && git pull origin dev && git checkout -b feature/sua-tarefa`).
- Nunca commite direto na `main` nem na `dev` — abra Pull Request para **`dev`**.
