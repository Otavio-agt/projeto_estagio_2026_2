require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../src/db/database');

const email = process.env.ADMIN_EMAIL;
const senha = process.env.ADMIN_SENHA;

if (!email || !senha) {
  console.error('Defina ADMIN_EMAIL e ADMIN_SENHA no .env antes de rodar este script.');
  process.exit(1);
}

const senhaHash = bcrypt.hashSync(senha, 10);

db.prepare(
  `INSERT INTO admins (email, senha_hash) VALUES (?, ?)
   ON CONFLICT(email) DO UPDATE SET senha_hash = excluded.senha_hash`
).run(email, senhaHash);

console.log(`Usuario admin pronto: ${email}`);
