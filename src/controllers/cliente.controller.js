const prisma = require("../data/prisma.js");

const cadastrar = async (req, res) => {
  try {
    const { nome, cpf, telefone, email } = req.body;

    // 🔴 validações
    if (!nome || !cpf || !telefone) {
      return res.status(400).json({
        erro: "Nome, CPF e telefone são obrigatórios",
      }).end();
    }

    const clienteExistente = await prisma.cliente.findUnique({
      where: { cpf },
    });

    if (clienteExistente) {
      return res.status(409).json({
        erro: "CPF já cadastrado",
      }).end();
    }

    const item = await prisma.cliente.create({
      data: {
        nome,
        cpf,
        telefone,
        email,
      },
    });

    return res.status(201).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao cadastrar cliente",
    }).end();
  }
};

const listar = async (req, res) => {
  try {
    const itens = await prisma.cliente.findMany();

    return res.status(200).json(itens).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao listar clientes",
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

    const item = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      return res.status(404).json({
        erro: "Cliente não encontrado",
      }).end();
    }

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar cliente",
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

    const clienteExistente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    if (!clienteExistente) {
      return res.status(404).json({
        erro: "Cliente não encontrado",
      }).end();
    }

    const item = await prisma.cliente.update({
      where: { id: Number(id) },
      data: req.body,
    });

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao atualizar cliente",
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

    const clienteExistente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    if (!clienteExistente) {
      return res.status(404).json({
        erro: "Cliente não encontrado",
      }).end();
    }

    const item = await prisma.cliente.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao deletar cliente",
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