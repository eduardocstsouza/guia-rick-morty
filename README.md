# Guia Rick and Morty

Aplicativo mobile híbrido desenvolvido em **Ionic 9 + Angular 22 (100% Standalone & Zoneless)** consumindo a API pública [Rick and Morty API](https://rickandmortyapi.com/api).

---

## Pré-requisitos de Ambiente

- **Node.js:** `^22.22.3`, `^24.15.0` ou `>=26.0.0` (Node 20 ou inferior **não** é compatível com Angular 22).
- **npm:** incluso com o Node.js.
- **Não é necessário** instalar `@ionic/cli` globalmente — ele já está travado em `devDependencies`.

### Setup inicial (obrigatório para todo o grupo)

```bash
# 1. Clonar o repositório
git clone https://github.com/eduardocstsouza/guia-rick-morty.git
cd guia-rick-morty

# 2. Instalar exatamente as versões travadas no package-lock.json
npm ci

# 3. Subir o servidor local
npx ionic serve
# ou: npm start
```

> **Regra de dependências:** sempre use `npm ci` ao atualizar sua branch. Nunca rode `npm install` solto para não alterar o `package-lock.json`.

---

## Padrões Técnicos deste Repositório (Leia antes de codar)

1. **Ionic 9 Standalone:** importe componentes e providers sempre diretamente de `'@ionic/angular'` (ex.: `import { IonHeader, IonContent } from '@ionic/angular';`). **Nunca** use `'@ionic/angular/standalone'` (removido no Ionic 9).
2. **Ícones (`ionicons` v8):** todo ícone usado em `<ion-icon name="...">` deve ser importado de `'ionicons/icons'` e registrado via `addIcons({ ... })` (de `'ionicons'`), senão não aparecerá na tela.
3. **Angular 22 Standalone & Zoneless:** proibido usar `NgModule` e `*ngIf`/`*ngFor`. Use sempre `@if` / `@for` nos templates e **`signal()` / `computed()`** (ou `async` pipe) para estados reativos, pois o projeto roda sem `zone.js`.
4. **ESLint rígido (`--max-warnings 0`):** exige `import type` para tipos/interfaces, imports em ordem alfabética com linha em branco entre pacotes externos e relativos, retorno explícito em métodos públicos (`: void`), seletores `app-kebab-case` (componentes) / `appCamelCase` (diretivas) e acessibilidade no HTML.
5. **Prettier e validação obrigatória:** antes de abrir PR, execute `npm run lint:fix`, `npm run lint`, `npm run build` e `npm run test:unit`.

---

## Scripts Úteis

| Comando | O que faz |
| :--- | :--- |
| `npx ionic serve` ou `npm start` | Inicia o servidor de desenvolvimento |
| `npm run lint` | Roda ESLint (`--max-warnings 0`), typecheck e verificação Prettier |
| `npm run lint:fix` | Corrige automaticamente regras de ESLint e formatação Prettier |
| `npm run build` | Gera o build de produção em `www/` |
| `npm run test:unit` | Executa os testes unitários com Vitest |

---

## Fluxo de Branches (Git)

- `main`: versão estável / entrega.
- `dev`: branch de integração do grupo.
- `feature/<nome-da-tarefa>`: branches individuais criadas **sempre a partir da `dev`**, integradas de volta via **Pull Request para `dev`**.

```bash
git checkout dev
git pull origin dev
git checkout -b feature/minha-feature
```
