const express = require("express");
const router = express.Router();

const {
  cadastrar,
  listar,
  buscarID,
  finalizar,
  delet,
} = require("../controllers/movimentacao.controller");

/**
 * @swagger
 * tags:
 *   name: Movimentacao
 *   description: Controle de entrada e saída do estacionamento
 */

/**
 * @swagger
 * /movimentacao/cadastrar:
 *   post:
 *     tags: [Movimentacao]
 *     summary: Entrada de veículo no estacionamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movimentacao'
 *     responses:
 *       201:
 *         description: Movimentação criada (entrada registrada)
 */
router.post("/cadastrar", cadastrar);

/**
 * @swagger
 * /movimentacao/listar:
 *   get:
 *     tags: [Movimentacao]
 *     summary: Listar todas as movimentações
 *     responses:
 *       200:
 *         description: Lista de movimentações
 */
router.get("/listar", listar);

/**
 * @swagger
 * /movimentacao/{id}:
 *   get:
 *     tags: [Movimentacao]
 *     summary: Buscar movimentação por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimentação encontrada
 *       404:
 *         description: Não encontrada
 */
router.get("/:id", buscarID);

/**
 * @swagger
 * /movimentacao/finalizar/{id}:
 *   put:
 *     tags: [Movimentacao]
 *     summary: Finalizar estacionamento (saída do veículo)
 *     description: Calcula tempo, valor total e libera vaga
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimentação finalizada com sucesso
 */
router.put("/finalizar/:id", finalizar);

/**
 * @swagger
 * /movimentacao/deletar/{id}:
 *   delete:
 *     tags: [Movimentacao]
 *     summary: Deletar movimentação
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimentação deletada
 */
router.delete("/deletar/:id", delet);

module.exports = router;