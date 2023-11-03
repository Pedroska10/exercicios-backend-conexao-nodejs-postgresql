const express = require("express");
const controladores = require("../controladores/autores");
const livros = require("../controladores/livros");
const rotas = express();

rotas.post("/autor", controladores.cadastroAutor);
rotas.get("/autor/:id", controladores.autor);
rotas.get("/autor/:id/livro", controladores.cadastrarLivroAutor);
rotas.get("/livros", livros);

module.exports = rotas;
