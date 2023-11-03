const pool = require("../bancodedados/conexão");

const listarLivros = async (req, res) => {
  try {
    const query = `
            SELECT
                l.id AS "id",
                l.nome AS "nome",
                l.genero AS "gênero",
                l.editora AS "editora",
                l.data_publicacao AS "data_publicação",
                json_build_object(
                    'id', a.id,
                    'nome', a.nome,
                    'idade', a.idade
                ) AS autor
                FROM
                    livros l
                LEFT JOIN
                    autores a ON l.autor_id = a.id
                GROUP BY
                    l.id, l.nome, l.genero, l.editora, l.data_publicacao, a.id, a.nome, a.idade
                ORDER BY    
                    l.id
        `;
    const resultado = await pool.query(query);
    return res.status(200).json(resultado.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = listarLivros;
