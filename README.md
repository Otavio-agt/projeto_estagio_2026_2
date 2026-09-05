# Leão Barbearia

Teste técnico de Estágio Full Stack (Mupi Systems). O enunciado original está em [`desafio.md`](./desafio.md); as decisões de tema, stack e uso de IA estão em [`DECISOES.md`](./DECISOES.md).

Página pública de agendamento + painel de gestão para uma barbearia fictícia:

- **`/`** — página pública, com o formulário de agendamento
- **`/login`** — login do admin
- **`/painel`** — lista os agendamentos, ordenados por data (protegido, exige login)

## Stack

Node.js + Express, views em EJS (renderizadas no servidor), banco SQLite via `node:sqlite` (módulo nativo do Node, sem dependências externas nem compilação), autenticação com `express-session` + `bcrypt`, e Tailwind via CDN pro CSS.

## Pré-requisitos

- **Node.js >= 22.5** (o módulo `node:sqlite` exige essa versão)

## Como rodar

1. Instale as dependências:

   ```
   npm install
   ```

2. Crie o arquivo `.env` a partir do exemplo:

   ```
   cp .env.example .env
   ```

   No PowerShell (Windows), use `Copy-Item .env.example .env` no lugar do `cp`.

3. Crie o usuário admin (lê `ADMIN_EMAIL` e `ADMIN_SENHA` do `.env`):

   ```
   npm run seed:admin
   ```

4. Suba o servidor:

   ```
   npm run dev
   ```

5. Acesse **http://localhost:3000**

O banco (`banco.db`) é criado automaticamente na primeira execução, a partir de `src/db/schema.sql` — não precisa rodar nenhuma migration à parte.

## Acessando o painel

Use o email e a senha definidos em `ADMIN_EMAIL` / `ADMIN_SENHA` no `.env`. Os valores padrão em `.env.example` são:

- **email:** `admin@leaobarbearia.com`
- **senha:** `senha123`

Se quiser trocar as credenciais depois de já ter criado o `.env`, edite `ADMIN_EMAIL`/`ADMIN_SENHA` e rode `npm run seed:admin` de novo — o script atualiza a senha do usuário existente em vez de duplicar.

## Estrutura do projeto

```
estagio-mupi/
├── src/
│   ├── app.js              # ponto de entrada, monta o Express e as rotas
│   ├── db/
│   │   ├── database.js     # abre a conexao com o SQLite e roda o schema
│   │   └── schema.sql      # definicao das tabelas (admins, agendamentos)
│   ├── middleware/
│   │   └── auth.js         # bloqueia rotas para quem nao esta logado
│   ├── routes/
│   │   ├── public.js       # pagina publica + envio do formulario
│   │   ├── auth.js         # login e logout
│   │   └── painel.js       # listagem de agendamentos (rota protegida)
│   └── views/
│       ├── index.ejs       # pagina publica com o formulario
│       ├── login.ejs       # tela de login do admin
│       └── painel.ejs      # painel de gestao
├── public/
│   ├── css/style.css       # design system (cores, tipografia, componentes)
│   └── js/                 # JS vanilla do navegador (quando necessario)
├── scripts/
│   └── seed-admin.js       # cria/atualiza o usuario admin a partir do .env
├── .env.example
├── DECISOES.md
├── desafio.md
└── package.json
```
