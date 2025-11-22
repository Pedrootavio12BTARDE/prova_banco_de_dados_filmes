CREATE DATABASE api_crud;
USE api_crud;

CREATE TABLE filmesNew (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    duracao INT NOT NULL, -- duração em minutos
    classificacao VARCHAR(10) NOT NULL,
     ano DATE NOT NULL
);

SELECT * FROM  filmesNew;