const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const STATUS_VALIDOS = ['pendente', 'confirmado', 'cancelado'];

router.get('/painel', requireAuth, (req, res) => {
  const agendamentos = db
    .prepare('SELECT * FROM agendamentos ORDER BY data ASC, horario ASC')
    .all();

  res.render('painel', { agendamentos });
});

router.post('/painel/agendamentos/:id/status', requireAuth, (req, res) => {
  const { status } = req.body;

  if (STATUS_VALIDOS.includes(status)) {
    db.prepare('UPDATE agendamentos SET status = ? WHERE id = ?').run(status, req.params.id);
  }

  res.redirect('/painel');
});

module.exports = router;
