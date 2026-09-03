const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/painel', requireAuth, (req, res) => {
  const agendamentos = db
    .prepare('SELECT * FROM agendamentos ORDER BY data ASC, horario ASC')
    .all();

  res.render('painel', { agendamentos });
});

module.exports = router;
