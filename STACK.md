# Stack do projeto

**Tema**: Estúdio de tatuagem — agendamento de sessão (registro = "agendamento")

| Camada | Tecnologia | Por quê |
|--------|-----------|---------|
| **Backend** | [Express](https://expressjs.com/) | Framework minimalista em JavaScript/Node. Poucas rotas, sem "mágica" escondida — fácil de entender de ponta a ponta para quem está começando com backend |
| **Views** | [EJS](https://ejs.co/) | Templates quase-HTML com `<% %>` para interpolar dados dinâmicos (ex: listar agendamentos). Renderizados no servidor, sem build extra |
| **Banco de dados** | SQLite (arquivo `banco.db`) | Zero configuração — não precisa instalar nem rodar um servidor de banco separado. Essencial para o projeto "rodar na máquina de outra pessoa" só com o README |
| **Acesso ao banco** | [`node:sqlite`](https://nodejs.org/api/sqlite.html) (`DatabaseSync`, nativo do Node) com SQL puro | Sem ORM — os comandos SQL (`INSERT`, `SELECT`) ficam visíveis no código, mais fácil de entender e explicar sendo iniciante em backend. Nativo do Node (>=22.5), sem dependência externa nem compilação |
| **Autenticação** | `express-session` + senha com hash (`bcrypt`) | Sessão guardada no servidor (`req.session.userId`). Senha do admin nunca fica em texto puro, sempre com hash. Mais simples de entender que bibliotecas de auth com "strategies" (ex: Passport) |
| **CSS** | Tailwind via CDN (uma linha no `<head>`) | Estilização rápida, sem configurar toolchain/build |
| **JS no navegador** | Vanilla JS (quando necessário) | Só para pequenas melhorias de interatividade, sem framework de frontend |

## Estrutura de pastas

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
│   ├── css/style.css       # estilos adicionais alem do Tailwind
│   └── js/                 # JS vanilla do navegador (quando necessario)
├── scripts/
│   └── seed-admin.js       # cria/atualiza o usuario admin a partir do .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── RESUMO-PROJETO.md
└── STACK.md
```

## Por que não outras opções

- **Next.js/React** foi descartado porque o objetivo é usar HTML/CSS/JS de forma mais direta (server-rendered), sem a curva de aprendizado de componentes e JSX.
- **Prisma (ORM)** foi trocado por SQL puro (via `node:sqlite`) para deixar explícito o que cada consulta faz, já que o backend ainda está sendo aprendido.
- **`better-sqlite3`** foi a primeira escolha para acessar o SQLite, mas a instalação falhou nessa máquina Windows por exigir compilação nativa (faltam as Build Tools do Visual Studio). Como o projeto precisa "rodar na máquina de outra pessoa" só com o README, trocamos para `node:sqlite`, que já vem embutido no Node e tem a mesma API (`.prepare().run()/.get()/.all()`), sem exigir nada além da versão certa do Node.
- **Passport.js** foi trocado por `express-session` + `bcrypt` direto — resolve a mesma necessidade (login/sessão) com menos conceitos novos.
