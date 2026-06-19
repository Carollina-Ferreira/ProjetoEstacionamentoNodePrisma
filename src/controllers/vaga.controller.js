const prisma = require("../data/prisma.js");

const cadastrar = async (req, res) => {
  try {
    const { numero, setor, tipo, status } = req.body;

    // 🔴 validações
    if (!numero || !setor || !tipo) {
      return res.status(400).json({
        erro: "Número, setor e tipo são obrigatórios",
      }).end();
    }

    const vagaExiste = await prisma.vaga.findUnique({
      where: { numero },
    });

    if (vagaExiste) {
      return res.status(409).json({
        erro: "Vaga já cadastrada",
      }).end();
    }

    const item = await prisma.vaga.create({
      data: {
        numero,
        setor,
        tipo,
        status: status || "Livre",
      },
    });

    return res.status(201).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao cadastrar vaga",
    }).end();
  }
};

const listar = async (req, res) => {
  try {
    const itens = await prisma.vaga.findMany();

    return res.status(200).json(itens).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao listar vagas",
    }).end();
  }
};

const buscarID = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido",
      }).end();
    }

    const item = await prisma.vaga.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      return res.status(404).json({
        erro: "Vaga não encontrada",
      }).end();
    }

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar vaga",
    }).end();
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido",
      }).end();
    }

    const vagaExiste = await prisma.vaga.findUnique({
      where: { id: Number(id) },
    });

    if (!vagaExiste) {
      return res.status(404).json({
        erro: "Vaga não encontrada",
      }).end();
    }

    const item = await prisma.vaga.update({
      where: { id: Number(id) },
      data: req.body,
    });

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao atualizar vaga",
    }).end();
  }
};

const delet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido",
      }).end();
    }

    const vagaExiste = await prisma.vaga.findUnique({
      where: { id: Number(id) },
    });

    if (!vagaExiste) {
      return res.status(404).json({
        erro: "Vaga não encontrada",
      }).end();
    }

    const item = await prisma.vaga.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao deletar vaga",
    }).end();
  }
};

module.exports = {
  cadastrar,
  listar,
  buscarID,
  update,
  delet,
};

