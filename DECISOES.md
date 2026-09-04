# Decisões

## Tema

Barbearia (**Leão Barbearia**). O "registro" do enunciado virou "agendamento": alguém marca um horário de corte/barba pelo site, e o barbeiro confirma ou cancela pelo painel.

A primeira versão do projeto era um estúdio de tatuagem, com uma identidade visual escura (preto + vermelho, estética de "flash sheet"). Troquei pra barbearia e pra uma paleta mais suave (creme, verde sálvia, dourado, terracota) depois de ver o resultado pronto e achar a versão anterior agressiva demais pro público que acessaria a página — mais detalhes na seção de IA abaixo, porque essa foi literalmente uma decisão tomada contra a sugestão da IA.

## Stack

| Camada | Tecnologia | Ganho | Perda |
|---|---|---|---|
| Backend | Express | Minimalista, poucas rotas, fácil de entender de ponta a ponta sendo iniciante em backend | Sem estrutura opinativa (rotas, validação, etc. são todos "na mão") |
| Views | EJS | Server-rendered, quase-HTML, sem build extra | Sem componentização real (cada página é um arquivo só) |
| Banco | SQLite via `node:sqlite` (nativo do Node, sem dependência externa) | Zero configuração, zero compilação nativa — essencial pra "rodar na máquina de outra pessoa" só com o README | API mais crua que um ORM; sem migrations versionadas |
| Acesso ao banco | SQL puro (sem ORM) | Cada `INSERT`/`SELECT` fica visível no código | Mais verboso pra queries complexas (não é um problema aqui, o projeto é pequeno) |
| Autenticação | `express-session` + `bcrypt` | Simples de explicar (sessão guardada no servidor, senha sempre com hash) | Sem "esqueci minha senha", refresh token, etc. — não precisava disso aqui |
| CSS | Tailwind via CDN | Estilização rápida sem configurar toolchain | Não dá pra fazer tree-shaking/purge do CSS não usado (irrelevante pro tamanho deste projeto) |

**Por que não outras opções:**
- **Next.js/React** foi descartado porque eu queria HTML/CSS/JS mais direto (server-rendered), sem a curva de aprendizado de componentes e JSX logo de cara.
- **Prisma (ORM)** foi trocado por SQL puro pra deixar explícito o que cada consulta faz, já que backend ainda é uma área que estou aprendendo.
- **Passport.js** foi trocado por `express-session` + `bcrypt` direto — resolve login/sessão com menos conceitos novos.
- **`better-sqlite3`** foi a primeira escolha pra acessar o SQLite, mas a instalação falhou nessa máquina Windows por exigir compilação nativa (faltam as Build Tools do Visual Studio, e não tem binário pré-compilado pra essa versão do Node/Windows). Como o critério "roda na máquina de outra pessoa só com o README" é um dos mais importantes do teste, troquei para `node:sqlite`, que já vem embutido no Node (>=22.5) e tem praticamente a mesma API (`.prepare().run()/.get()/.all()`).

## O que ficou de fora (de propósito)

- **Mudar o status pelo painel** (confirmar/cancelar um agendamento direto na listagem). O painel hoje só *lista* os agendamentos com o status atual. Ficou de fora porque priorizei fechar o fluxo básico (formulário → banco → login → painel → logout) e a estilização antes de expandir funcionalidade. É o próximo item natural de "além do mínimo".
- **Envio de email de verdade**: a confirmação é só visual, na própria página. Não integrei nenhum serviço de email — não fazia sentido gastar tempo nisso pra um teste técnico.
- **Validação de conflito de horário** (dois agendamentos no mesmo horário): o formulário aceita qualquer combinação de data/horário sem checar duplicidade. Ficou de fora por tempo; numa barbearia de verdade seria importante.
- **Paginação no painel**: como o volume de dados de um teste é pequeno, não implementei. Seria necessário numa base de dados real.

## Uso de IA

Usei o Claude Code do início ao fim: ele escreveu praticamente todo o código (rotas, schema, views, CSS), e meu papel foi tomar as decisões de produto/design e verificar se o que saiu batia com o que eu queria e com o que o teste pedia.

**O que delegei e o que fiz "à mão":** delegei toda a escrita de código — rotas Express, schema SQL, EJS, CSS — porque eu ainda não tenho fluência suficiente em backend pra escrever isso do zero com a mesma velocidade, e o ponto do teste (pelo que entendi) não é digitar cada linha, e sim tomar decisão consciente sobre o que construir. O que fiz à mão foi: escolher e trocar o tema, decidir a stack (rejeitando as duas primeiras sugestões mais complexas), testar o fluxo manualmente no navegador a cada etapa (formulário, login, painel, logout, proteção de rota), e revisar o resultado visual pra decidir se ficava ou mudava.

**Uma vez em que a IA errou:** a primeira sugestão de banco (`better-sqlite3`) não instalou nessa máquina porque exige compilar código nativo e faltam as ferramentas de build do Visual Studio no Windows. Percebi o problema porque o `npm install` simplesmente falhou com um erro de compilação. A solução foi trocar pra `node:sqlite`, que é nativo do Node e não precisa compilar nada.

**Uma decisão contra a sugestão da IA:** a primeira versão da identidade visual (tema de estúdio de tatuagem, fundo preto, vermelho forte, tipografia gótica) foi proposta e implementada pela IA, mas eu não gostei do resultado — achei pesado/agressivo demais pro tipo de público que uma página assim receberia. Descartei o tema inteiro e pedi pra recomeçar como barbearia, com cores mais suaves e um nome mais chamativo, mesmo já tendo um resultado "pronto e funcionando".
