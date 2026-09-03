const express = require('express');
const db = require('../db/database');

const router = express.Router();

const ESTILOS = ['fineline', 'blackwork', 'colorido', 'geometrico'];

router.get('/', (req, res) => {
  res.render('index', { estilos: ESTILOS, sucesso: req.query.sucesso === '1' });
});

router.post('/agendamentos', (req, res) => {
  const { nome, email, estilo, data, horario } = req.body;

  if (!nome || !email || !ESTILOS.includes(estilo) || !data || !horario) {
    return res.redirect('/?sucesso=0');
  }

  db.prepare(
    `INSERT INTO agendamentos (nome, email, estilo, data, horario)
     VALUES (?, ?, ?, ?, ?)`
  ).run(nome, email, estilo, data, horario);

  res.redirect('/?sucesso=1');
});

module.exports = router;
