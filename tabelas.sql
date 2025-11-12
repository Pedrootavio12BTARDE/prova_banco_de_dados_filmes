CREATE DATABASE api_crud;
USE api_crud;
CREATE TABLE cliente (
 cpf VARCHAR(20)PRIMARY KEY,
nome VARCHAR(50)
);

CREATE TABLE produtos (
cod_barra VARCHAR(50) PRIMARY KEY,
descricao VARCHAR(50),
valor DECIMAL(6,2)
);

CREATE TABLE compra(
cod_compra VARCHAR(50)PRIMARY KEY,
cpf VARCHAR(20),
cod_barra VARCHAR(50),
FOREIGN KEY(cod_compra) REFERENCES cliente(cpf),
FOREIGN KEY(cod_barra) REFERENCES produtos(cod_barra)
)
