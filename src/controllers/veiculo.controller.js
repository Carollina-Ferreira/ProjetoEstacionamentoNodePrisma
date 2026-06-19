const prisma = require("../data/prisma.js");

const cadastrar = async (req, res) => {
  try {
    const { placa, modelo, marca, cor, tipo, clienteId } = req.body;

    // 🔴 validações
    if (!placa || !modelo || !marca || !cor || !tipo || !clienteId) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios",
      }).end();
    }

    if (isNaN(clienteId)) {
      return res.status(400).json({
        erro: "clienteId inválido",
      }).end();
    }

    // 🔎 verifica cliente
    const clienteExiste = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });

    if (!clienteExiste) {
      return res.status(404).json({
        erro: "Cliente não encontrado",
      }).end();
    }

    // 🚨 REGRA NOVA: cliente só pode ter 1 veículo
    const veiculoDoCliente = await prisma.veiculo.findFirst({
      where: { clienteId: Number(clienteId) },
    });

    if (veiculoDoCliente) {
      return res.status(409).json({
        erro: "Este cliente já possui um veículo cadastrado",
      }).end();
    }

    // 🔎 placa única
    const veiculoExiste = await prisma.veiculo.findUnique({
      where: { placa },
    });

    if (veiculoExiste) {
      return res.status(409).json({
        erro: "Placa já cadastrada",
      }).end();
    }

    const item = await prisma.veiculo.create({
      data: {
        placa,
        modelo,
        marca,
        cor,
        tipo,
        clienteId: Number(clienteId),
      },
    });

    return res.status(201).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao cadastrar veículo",
    }).end();
  }
};

const listar = async (req, res) => {
  try {
    const itens = await prisma.veiculo.findMany({
      include: {
        cliente: true,
      },
    });

    return res.status(200).json(itens).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao listar veículos",
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

    const item = await prisma.veiculo.findUnique({
      where: { id: Number(id) },
      include: {
        cliente: true,
      },
    });

    if (!item) {
      return res.status(404).json({
        erro: "Veículo não encontrado",
      }).end();
    }

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar veículo",
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

    const veiculoExiste = await prisma.veiculo.findUnique({
      where: { id: Number(id) },
    });

    if (!veiculoExiste) {
      return res.status(404).json({
        erro: "Veículo não encontrado",
      }).end();
    }

    const item = await prisma.veiculo.update({
      where: { id: Number(id) },
      data: req.body,
    });

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao atualizar veículo",
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

    const veiculoExiste = await prisma.veiculo.findUnique({
      where: { id: Number(id) },
    });

    if (!veiculoExiste) {
      return res.status(404).json({
        erro: "Veículo não encontrado",
      }).end();
    }

    const item = await prisma.veiculo.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao deletar veículo",
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
