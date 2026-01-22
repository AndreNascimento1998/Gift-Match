# Gift Match

Projeto React com Vite + TypeScript, rotas, estado global, testes e toolchain completa (lint, format, hooks). Este README documenta todas as tecnologias e como usar.

## Tecnologias e bibliotecas

### Front-end

- **React 19**: base da UI.
- **React Router 7**: roteamento SPA com `createBrowserRouter`.
- **Zustand 5**: estado global simples e performático.
- **Material UI (MUI)**: componentes prontos (ex.: `Button`).
- **Tailwind CSS v4**: utilitários CSS via plugin do Vite.
- **Sass (SCSS)**: estilos globais e de app usando `.scss`.

### Build e tooling

- **Vite 7**: dev server e build.
- **TypeScript 5**: tipagem estática.
- **PostCSS + Autoprefixer**: pipeline CSS.

### Qualidade e formatação

- **ESLint 9**: linting de TS/React.
- **Prettier**: formatação automática (sem `;` e 4 espaços).
- **Husky**: hooks Git (pre-commit e pre-push).

### Testes

- **Vitest**: runner de testes.
- **Testing Library** (`@testing-library/react` + `jest-dom`): testes de UI.
- **jsdom**: ambiente de teste DOM.

## Estrutura principal

- `src/router/`: configuração do React Router.
- `src/pages/`: páginas/rotas (ex.: `Home`, `About`).
- `src/stores/`: stores do Zustand (estado global).
- `src/index.scss`: estilos globais + Tailwind.
- `src/App.scss`: estilos locais do app.

## Scripts

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: build de produção.
- `npm run preview`: preview do build.
- `npm run lint`: lint.
- `npm run lint:fix`: lint com correções.
- `npm run format`: formata tudo com Prettier.
- `npm run format:check`: valida formatação.
- `npm run test`: modo watch do Vitest.
- `npm run test:run`: roda todos os testes.

## Hooks Git (Husky)

- **pre-commit**: roda `npm run format` e `npm run test:run`.
- **pre-push**: roda `npm run build` e `npm run test:run`.

## Observações de estilo

- Prettier configurado com 4 espaços e sem ponto-e-vírgula.
- SCSS como padrão para estilos no projeto.
