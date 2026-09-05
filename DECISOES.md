# Decisões

## Tema

Barbearia (**Leão Barbearia**).A lguém marca um horário de corte/barba pelo site, e o barbeiro confirma ou cancela pelo painel, simples assim. Usei um design mais minimalista usando paletas claras.

A primeira versão do projeto era um estúdio de tatuagem, mas troquei pra barbearia pois achei que algo que combinasse com tons claros e que seria mais fácil de se fazer, depois de ver o resultado do estudio de tatuagem e achar a barbearia mais interessante, optei por usar uma ela como exemplo — Usei o Claude code como IA para fazer apenas algumas partes do design, e a parte do backend ele fez quase tudo sozinho pois é uma área que ainda estou aprendendo, ele me perguntava sobre o que iria fazer e eu ia guiando ele para deixar do jeito que eu conseguisse entender e explicar na entrevista.

## Stack

| Camada | Tecnologia | Ganho | Perda |
|---|---|---|---|
| Backend | Express | Minimalista, poucas rotas, fácil de entender de ponta a ponta sendo iniciante em backend | Sem estrutura opinativa (rotas, validação, etc. são todos "na mão") |
| Views | EJS | Server-rendered, quase-HTML, sem build extra | Sem componentização real (cada página é um arquivo só) |
| Banco | SQLite via `node:sqlite` (nativo do Node, sem dependência externa) | Zero configuração, zero compilação nativa — essencial pra "rodar na máquina de outra pessoa" só com o README | API mais crua que um ORM; sem migrations versionadas |
| Acesso ao banco | SQL puro (sem ORM) | Cada `INSERT`/`SELECT` fica visível no código | Mais verboso pra queries complexas (não é um problema aqui, o projeto é pequeno) |
| Autenticação | `express-session` + `bcrypt` | Simples de explicar (sessão guardada no servidor, senha sempre com hash) | Sem "esqueci minha senha", refresh token, etc. — não precisava disso aqui |
| CSS | Tailwind via CDN | Estilização rápida sem configurar toolchain | Não dá pra fazer tree-shaking/purge do CSS não usado (irrelevante pro tamanho deste projeto) |
Como não sabia ao certo de como funciona muito bem um backend, optei por deixar a IA me explicar qual fazia mais sentido e qual era a mais fácil de compreender.

**Por que não outras opções:**
- **Next.js/React** foi descartado porque eu queria HTML/CSS/JS mais direto (server-rendered), sem a curva de aprendizado de componentes e JSX logo de cara.
- **Prisma (ORM)** foi trocado por SQL puro pra deixar explícito o que cada consulta faz, já que backend ainda é uma área que estou aprendendo.
- **Passport.js** foi trocado por `express-session` + `bcrypt` direto — resolve login/sessão com menos conceitos novos.
- **`better-sqlite3`** foi a primeira escolha pra acessar o SQLite, mas a instalação falhou nessa máquina Windows por exigir compilação nativa (faltam as Build Tools do Visual Studio, e não tem binário pré-compilado pra essa versão do Node/Windows). Como o critério "roda na máquina de outra pessoa só com o README" é um dos mais importantes do teste, troquei para `node:sqlite`, que já vem embutido no Node (>=22.5) e tem praticamente a mesma API (`.prepare().run()/.get()/.all()`).

## O que ficou de fora (de propósito)

- **Envio de email de verdade**: a confirmação é só visual, na própria página. Não integrei nenhum serviço de email — não fazia sentido gastar tempo nisso pra um teste técnico.
- **Paginação no painel**: como o volume de dados de um teste é pequeno, não implementei. Seria necessário numa base de dados real.
- **"Esqueci minha senha" / troca de senha pelo painel**: a única forma de trocar a senha do admin é editando o `.env` e rodando `npm run seed:admin` de novo. Pra um único usuário admin, não achei que valia a complexidade extra.

## Além do mínimo

- **Confirmar/cancelar agendamento direto no painel**: cada linha mostra só as ações que fazem sentido pro status atual (some "confirmar" se já está confirmado, e vice-versa).
- **Validação de conflito de horário**: o formulário recusa um novo agendamento se já existir outro (não cancelado) na mesma data e horário, e mostra uma mensagem explicando o motivo.

## Uso de IA

Usei o Claude Code, ele escreveu o código (rotas, schema, views, CSS), e meu papel foi tomar as decisões de produto/design e verificar se o que saiu batia com o que eu queria e com o que o teste pedia.

**O que delegei e o que fiz "à mão":** delegei toda a escrita de código — rotas Express, schema SQL, EJS, CSS — porque eu ainda não tenho fluência suficiente em backend pra escrever isso do zero com a mesma velocidade, e o ponto do teste (pelo que entendi) não é digitar cada linha, e sim tomar decisão consciente sobre o que construir. O que fiz à mão foi: escolher e trocar o tema, decidir a stack (rejeitando as duas primeiras sugestões mais complexas), testar o fluxo manualmente no navegador a cada etapa (formulário, login, painel, logout, proteção de rota), e revisar o resultado visual pra decidir se ficava ou mudava.

**Uma vez em que a IA errou:** a primeira sugestão de banco (`better-sqlite3`) não instalou nessa máquina porque exige compilar código nativo e faltam as ferramentas de build do Visual Studio no Windows. Percebi o problema porque o `npm install` simplesmente falhou com um erro de compilação. A solução foi trocar pra `node:sqlite`, que é nativo do Node e não precisa compilar nada.

**Uma decisão contra a sugestão da IA:** a primeira versão da identidade visual (tema de estúdio de tatuagem, fundo preto, vermelho forte, tipografia gótica) foi proposta e implementada pela IA, mas eu não gostei do resultado — achei agressivo demais pro tipo de público que uma página assim receberia. Descartei o tema inteiro e pedi pra recomeçar como barbearia, com cores mais suaves e um nome mais chamativo, mesmo já tendo um resultado "pronto e funcionando".
