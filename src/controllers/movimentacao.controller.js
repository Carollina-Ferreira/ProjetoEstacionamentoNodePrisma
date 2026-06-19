const prisma = require("../data/prisma.js");

const cadastrar = async (req, res) => {
  try {
    const { veiculoId, vagaId, usuarioId, valorHora } = req.body;

    // 🔴 validações
    if (!veiculoId || !vagaId || !usuarioId || !valorHora) {
      return res.status(400).json({
        erro: "veiculoId, vagaId, usuarioId e valorHora são obrigatórios",
      }).end();
    }

    // valida vaga
    const vaga = await prisma.vaga.findUnique({
      where: { id: Number(vagaId) },
    });

    if (!vaga) {
      return res.status(404).json({
        erro: "Vaga não encontrada",
      }).end();
    }

    if (vaga.status === "Ocupada") {
      return res.status(409).json({
        erro: "Vaga já está ocupada",
      }).end();
    }

    // valida veículo
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: Number(veiculoId) },
    });

    if (!veiculo) {
      return res.status(404).json({
        erro: "Veículo não encontrado",
      }).end();
    }

    // cria movimentação
    const item = await prisma.movimentacao.create({
      data: {
        veiculoId: Number(veiculoId),
        vagaId: Number(vagaId),
        usuarioId: Number(usuarioId),
        valorHora: Number(valorHora),
        valorTotal: 0,
        status: "Aberto",
      },
    });

    // ocupa vaga
    await prisma.vaga.update({
      where: { id: Number(vagaId) },
      data: { status: "Ocupada" },
    });

    return res.status(201).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao criar movimentação",
    }).end();
  }
};

const listar = async (req, res) => {
  try {
    const itens = await prisma.movimentacao.findMany({
      include: {
        veiculo: true,
        vaga: true,
        usuario: true,
      },
    });

    return res.status(200).json(itens).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao listar movimentações",
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

    const item = await prisma.movimentacao.findUnique({
      where: { id: Number(id) },
      include: {
        veiculo: true,
        vaga: true,
        usuario: true,
      },
    });

    if (!item) {
      return res.status(404).json({
        erro: "Movimentação não encontrada",
      }).end();
    }

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar movimentação",
    }).end();
  }
};

const finalizar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        erro: "ID inválido",
      }).end();
    }

    const mov = await prisma.movimentacao.findUnique({
      where: { id: Number(id) },
    });

    if (!mov) {
      return res.status(404).json({
        erro: "Movimentação não encontrada",
      }).end();
    }

    if (mov.status === "Finalizado") {
      return res.status(409).json({
        erro: "Movimentação já finalizada",
      }).end();
    }

    // calcula tempo (em horas)
    const entrada = new Date(mov.dataEntrada);
    const saida = new Date();

    const diffMs = saida - entrada;
    const horas = diffMs / (1000 * 60 * 60);

    const total = horas * Number(mov.valorHora);

    // atualiza movimentação
    const item = await prisma.movimentacao.update({
      where: { id: Number(id) },
      data: {
        dataSaida: saida,
        valorTotal: total,
        status: "Finalizado",
      },
    });

    // libera vaga
    await prisma.vaga.update({
      where: { id: mov.vagaId },
      data: { status: "Livre" },
    });

    return res.status(200).json(item).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao finalizar movimentação",
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

    const item = await prisma.movimentacao.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      return res.status(404).json({
        erro: "Movimentação não encontrada",
      }).end();
    }

    await prisma.movimentacao.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({
      mensagem: "Movimentação deletada",
    }).end();

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao deletar movimentação",
    }).end();
  }
};

module.exports = {
  cadastrar,
  listar,
  buscarID,
  finalizar,
  delet,
};

