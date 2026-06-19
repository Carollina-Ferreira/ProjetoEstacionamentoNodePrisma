const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Sistema de Estacionamento API",
    version: "1.0.0",
    description: "API completa de estacionamento com usuários, clientes, veículos, vagas e movimentações",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      Usuario: {
        type: "object",
        properties: {
          nome: { type: "string" },
          email: { type: "string" },
          senha: { type: "string" },
          perfil: { type: "string" },
        },
      },

      Cliente: {
        type: "object",
        properties: {
          nome: { type: "string" },
          cpf: { type: "string" },
          telefone: { type: "string" },
          email: { type: "string" },
        },
      },

      Veiculo: {
        type: "object",
        properties: {
          placa: { type: "string" },
          modelo: { type: "string" },
          marca: { type: "string" },
          cor: { type: "string" },
          tipo: { type: "string" },
          clienteId: { type: "integer" },
        },
      },

      Vaga: {
        type: "object",
        properties: {
          numero: { type: "string" },
          setor: { type: "string" },
          tipo: { type: "string" },
          status: { type: "string" },
        },
      },

      Movimentacao: {
        type: "object",
        properties: {
          veiculoId: { type: "integer" },
          vagaId: { type: "integer" },
          usuarioId: { type: "integer" },
          valorHora: { type: "number" },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJSDoc(options);