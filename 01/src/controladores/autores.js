const pool = require("../bancodedados/conexão");

const cadastroAutor = async (req, res) => {
  const { nome, idade } = req.body;
  if (!nome) {
    return res.status(404).json({ mensagem: "O campo nome é obrigatório" });
  }
  try {
    const query =
      "insert into autores (nome, idade) values ($1, $2) returning *";

    const params = [nome, idade];

    const resultado = await pool.query(query, params);

    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const autor = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `SELECT
    a.id AS "id",
    a.nome AS "nome",
    a.idade AS "idade",
    json_agg(
        json_build_object(
            'id', l.id,
            'nome', l.nome,
            'genero', l.genero,
            'editora', l.editora,
            'data_publicacao', l.data_publicacao,
        )
    ) AS "livros"
FROM autores a
LEFT JOIN livros l ON a.id = l.autor_id
where a.id = $1
group by a.id, a.nome, a.idade
ORDER BY a.id`;
    const params = [id];
    const resultado = await pool.query(query, params);
    return res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

const cadastrarLivroAutor = async (req, res) => {
  const { nome, genero, editora, data_publicacao } = req.body;
  const { id } = req.params;

  if (!nome) {
    return res.status(404).json({ mensagem: "O campo nome é obrigatório" });
  }

  try {
    const query =
      "insert into livros (autor_id, nome, genero, editora, data_publicacao) values ($1, $2, $3, $4, $5) returning *";

    const params = [id, nome, genero, editora, data_publicacao];

    const resultado = await pool.query(query, params);
    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensagem: "Autor inexistente" });
    }
    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

module.exports = { cadastroAutor, autor, cadastrarLivroAutor };
