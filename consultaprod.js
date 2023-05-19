const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configurações do banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aluno01",
  database: "meuBanco"
});

// Conexão com o banco de dados
connection.connect();

// Rota para exibir o formulário de consulta
app.get('/produtos', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de Produtos</title>
      </head>
      <body>
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/produtos">
          <label for="nome">ID:</label>
          <input type="text" id="id" name="id"><br><br>
          <label for="descricao">Descrição:</label>
          <input type="text" id="descricao" name="descricao"><br><br>
          <label for="quantidade">Idade:</label>
          <input type="text" id="quantidade" name="quantidade"><br><br>
          <label for="valor">Valor:</label>
          <input type="text" id="valor" name="valor"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/clientes', (req, res) => {
  //const nome = req.body.nome;
  const { id, descricao, quantidade, valor } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes WHERE id LIKE '%${id}%'`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Clientes</title>
        </head>
        <body>
          <h1>Clientes encontrados</h1>
          <table>
            <tr>
              <th>id</th>
              <th>descricao</th>
              <th>quantidade</th>
              <th>Número de filhos</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.id}</td>
          <td>${cliente.descricao}</td>
          <td>${cliente.quantidade}</td>
          <td>${cliente.valor}</td>
        </tr>
      `;
    });
    
    html += `
          </table>
        </body>
      </html>
    `;
    
    res.send(html);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
