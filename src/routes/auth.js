const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/database');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { erro: null });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);

  if (!admin || !bcrypt.compareSync(senha, admin.senha_hash)) {
    return res.render('login', { erro: 'Email ou senha invalidos' });
  }

  req.session.userId = admin.id;
  res.redirect('/painel');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
