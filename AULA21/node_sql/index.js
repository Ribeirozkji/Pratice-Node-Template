const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "teste34",
});

app.get("/", (req, res) => {
  res.render("home");
});

app.post('/teste/insertteste', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;

  const sql = 'INSERT INTO teste (nome, email, senha) VALUES (?, ?, ?)';

  conn.query(sql, [nome, email, senha], function(err) {
    if (err) {
      console.log(err);
      return res.status(500).send('Erro ao inserir dados');
    }

    res.redirect('/teste');
  });
});

app.get("/teste", (req, res) => {
  const sql = "SELECT * FROM teste";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro ao buscar dados");
    }

    res.render("teste", { teste: data });
  });
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Conectado ao MySQL");
  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
});
