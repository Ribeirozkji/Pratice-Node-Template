const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const path = require('path');

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Configuração do mecanismo de visualização handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

// Rota para renderizar o arquivo home.handlebars
app.get('/', (req, res) => {
  res.render('layouts/home');
});


app.post('/teste/insertteste', (req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const sql = ` INSERT INTO teste (nome, email) VALUES  ('${nome}', '${email}') `
    conn.query(sql, function(err){
        if (err) {
            console.log(err);
          }
          res.redirect('/teste')
    })
})

app.get('/teste', (req, res)=> {
  const sql= "SELECT * FROM teste"

  conn.query(sql, function  (err, data){
    if (err) {
      console.log(err);
     return
    }
    const teste =data;
    console.log(teste);

    res.render('layouts/teste', {teste} );
  });
});
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teste34',
});

conn.connect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Conectado ao MySQL');
  app.listen(3000);
});
