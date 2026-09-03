CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS agendamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  estilo TEXT NOT NULL CHECK (estilo IN ('fineline', 'blackwork', 'colorido', 'geometrico')),
  data TEXT NOT NULL,
  horario TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'cancelado')),
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);
