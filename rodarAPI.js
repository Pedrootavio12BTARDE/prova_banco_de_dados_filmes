const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// -------------------------------------------------------
// Cadastrar filme
// -------------------------------------------------------
app.post('/filme', (req, res) => {
    const { nome, genero, duracao, classificacao, ano } = req.body;

    const codigoDoMySQL = `
        INSERT INTO filmesNew (nome, genero, duracao, classificacao, ano)
        VALUES (?, ?, ?, ?, ?)
    `;

    acessaBancoNoServidor.query(
        codigoDoMySQL,
        [nome, genero, duracao, classificacao, ano],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.json({ error: 'Erro ao cadastrar filme' });
            }
            res.json({ message: 'Filme cadastrado com sucesso!' });
        }
    );
});

// -------------------------------------------------------
// Listar filmes
// -------------------------------------------------------
app.get('/filmes', (req, res) => {
    const codigoDoMySQL = `
        SELECT nome, genero, duracao, classificacao, ano
        FROM filmesNew
    `;

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            console.log(err);
            return res.json({ error: 'Erro ao buscar filmes' });
        }
        res.json(results);
    });
});


// -------------------------------------------------------
// Porta do servidor
// -------------------------------------------------------
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});