const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Criar cliente
app.post('/cliente', (req, res) => {
    const { cpf, nome } = req.body;

    const codigoDoMySQL = 'INSERT INTO cliente (cpf, nome) VALUES (?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [cpf, nome], (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao cadastrar' });
        }
        res.json({ message: 'Cliente cadastrado!' });
    });
});

// Listar clientes
app.get('/clientes', (req, res) => {
    const codigoDoMySQL = 'SELECT cpf, nome FROM cliente';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao buscar' });
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
