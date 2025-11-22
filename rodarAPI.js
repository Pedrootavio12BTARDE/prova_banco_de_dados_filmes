const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // permite acessar arquivos HTML, CSS e JS

// -------------------------------------------------------
// Cadastrar filme
// -------------------------------------------------------
app.post('/filmes', (req, res) => {
    const { nome, genero, duracao, classificacao, ano } = req.body;

    const sql = `
        INSERT INTO filmesNew (nome, genero, duracao, classificacao, ano)
        VALUES (?, ?, ?, ?, ?)
    `;

    acessaBancoNoServidor.query(sql, [nome, genero, duracao, classificacao, ano], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao cadastrar filme' });
        }
        res.json({ message: 'Filme cadastrado com sucesso!' });
    });
});

// -------------------------------------------------------
// Listar filmes
// -------------------------------------------------------
app.get('/filmes', (req, res) => {
    const sql = `SELECT id, nome, genero, duracao, classificacao, ano FROM filmesNew`;

    acessaBancoNoServidor.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao buscar filmes' });
        }
        res.json(results);
    });
});

// -------------------------------------------------------
// Atualizar filme
// -------------------------------------------------------
app.put('/filmes/:id', (req, res) => {
    const id = req.params.id;
    const { nome, genero, duracao, classificacao, ano } = req.body;

    const sql = `
        UPDATE filmesNew
        SET nome = ?, genero = ?, duracao = ?, classificacao = ?, ano = ?
        WHERE id = ?
    `;

    acessaBancoNoServidor.query(sql, [nome, genero, duracao, classificacao, ano, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao atualizar filme' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }
        res.json({ message: 'Filme atualizado com sucesso!' });
    });
});

// -------------------------------------------------------
// Deletar filme
// -------------------------------------------------------
app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM filmesNew WHERE id = ?';

    acessaBancoNoServidor.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Erro ao deletar filme' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Filme não encontrado' });
        }
        res.json({ message: 'Filme excluído com sucesso!' });
    });
});

// -------------------------------------------------------
// Inicialização do servidor
// -------------------------------------------------------
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});