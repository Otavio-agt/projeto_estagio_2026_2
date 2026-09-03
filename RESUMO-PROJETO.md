# Resumo do Teste Técnico — Estágio Full Stack (Mupi Systems)

## O que precisa ser construído

Um sistema web com **tema livre** (barbearia, clínica, curso, ONG, restaurante etc.) composto por:

1. **Página pública** — apresenta o negócio/projeto e tem um formulário de "registro" (agendamento, inscrição, pedido...)
2. **Persistência** — o que chega pelo formulário é salvo no banco com status `pendente`
3. **Painel de gestão** — protegido por login, lista todos os registros ordenados por data

### Campos obrigatórios do registro

| Campo | Observação |
|-------|------------|
| nome | Nome de quem preencheu |
| email | Email de quem preencheu |
| tipo | Valor restrito a ≥3 opções definidas por você conforme o tema |
| data | Data que faça sentido no tema |
| horário | Se fizer sentido; senão, troque por outro campo relevante ao tema |
| status | `pendente`, `confirmado`, `cancelado` — nasce sempre como `pendente` |
| criado_em | Quando o registro foi criado |

### Stack

Livre — usar o que você já domina, não o que quer aprender. Autenticação pronta é permitida (Auth.js, Devise, Passport, etc.), mas você precisa saber explicá-la.

### Entregáveis

- Repositório (fork do original) com histórico de commits incrementais
- `README.md` — descrição do projeto, stack e passo a passo para rodar (deve funcionar na máquina de outra pessoa)
- `DECISOES.md` — decisões de tema/stack, ambiguidades percebidas, e seção sobre uso de IA
- Pull Request do fork para o repositório original, com: o que foi além do pedido, o que decidiu não fazer, onde teve dificuldade

### Critérios de avaliação

**O básico (piso):** formulário salva no banco, painel lista ordenado com status visível, login protege o painel, projeto roda seguindo o próprio README.

**Desempate (o que diferencia):** criatividade, julgamento sobre ambiguidades, escolha de ferramenta justificada, iniciativa (algo não pedido), priorização (corte de escopo explicado), domínio do próprio código, cuidado (estados vazios, responsivo), comunicação (README/PR/commits claros).

## Etapas de desenvolvimento

**1. Definição (antes de codar)**
- Escolher o tema (o que o negócio faz, quem preenche o formulário)
- Escolher a stack (a que você já domina)
- Definir os 3+ tipos válidos para o campo "tipo"
- Decidir se "horário" faz sentido ou qual campo substitui

**2. Setup do projeto**
- Inicializar repo (fork do original), scaffolding da stack escolhida
- Configurar banco (Postgres/MySQL/SQLite) e criar a migration/model do registro
- Configurar autenticação pronta (não reinventar login)

**3. Backend / dados**
- Model/tabela do registro com os campos exigidos
- Endpoint para receber o formulário → salvar com status `pendente`
- Endpoint/rota protegida para listar registros ordenados por data
- Seed/comando para criar o usuário admin

**4. Página pública**
- Seção com informações do negócio e opções oferecidas
- Formulário com validação (frontend + backend)
- Feedback visual de sucesso no envio
- Responsivo

**5. Painel de gestão**
- Tela de login (simples, design não avaliado)
- Middleware/guard que bloqueia acesso direto via URL sem sessão
- Listagem com status visível (badge colorida), ordenada por data
- Logout funcional

**6. Testar o fluxo crítico**
- Aba anônima → tentar acessar painel direto pela URL → deve redirecionar ao login (item mais esquecido segundo o próprio README)

**7. Além do mínimo (escolher 2–3, bem feitas)**
- Ex.: confirmar/cancelar registro no painel, filtros por status/data, contadores no topo do painel, evitar conflito de horário
- Pelo menos 1 coisa não pedida, com justificativa no PR

**8. Documentação final**
- `README.md`: pré-requisitos, instalação, variáveis de ambiente (`.env.example`), setup do banco, como criar o usuário admin, como rodar
- `DECISOES.md`: tema e stack escolhidos (prós/contras), decisões sobre ambiguidades, seção de uso de IA (o que delegou, um caso em que a IA errou, uma decisão contra a sugestão da IA)
- Testar o README numa pasta limpa (clone do zero)

**9. Submissão**
- Commits incrementais com mensagens que contam a história (não um único commit final)
- Abrir PR do fork com: o que foi além do pedido, o que decidiu não fazer, onde teve dificuldade
