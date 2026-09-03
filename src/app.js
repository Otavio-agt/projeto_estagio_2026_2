require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');

const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const painelRoutes = require('./routes/painel');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(publicRoutes);
app.use(authRoutes);
app.use(painelRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
