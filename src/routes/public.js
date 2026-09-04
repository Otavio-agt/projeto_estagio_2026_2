const express = require('express');
const db = require('../db/database');

const router = express.Router();

const SERVICOS = ['corte', 'barba', 'corte e barba', 'corte infantil'];

router.get('/', (req, res) => {
  res.render('index', {
    servicos: SERVICOS,
    sucesso: req.query.sucesso === '1',
    erro: req.query.erro || null,
  });
});

router.post('/agendamentos', (req, res) => {
  const { nome, email, servico, data, horario } = req.body;

  if (!nome || !email || !SERVICOS.includes(servico) || !data || !horario) {
    return res.redirect('/?erro=invalido');
  }

  const conflito = db
    .prepare(
      "SELECT id FROM agendamentos WHERE data = ? AND horario = ? AND status != 'cancelado'"
    )
    .get(data, horario);

  if (conflito) {
    return res.redirect('/?erro=conflito');
  }

  db.prepare(
    `INSERT INTO agendamentos (nome, email, servico, data, horario)
     VALUES (?, ?, ?, ?, ?)`
  ).run(nome, email, servico, data, horario);

  res.redirect('/?sucesso=1');
});

module.exports = router;
