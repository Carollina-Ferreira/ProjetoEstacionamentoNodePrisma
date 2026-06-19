const express = require("express");
const router = express.Router();

const {
  cadastrar,
  listar,
  buscarID,
  update,
  delet,
} = require("../controllers/cliente.controller");

/**
 * @swagger
 * tags:
 *   name: Cliente
 *   description: CRUD de clientes do sistema de estacionamento
 */

/**
 * @swagger
 * /cliente/cadastrar:
 *   post:
 *     tags: [Cliente]
 *     summary: Criar cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
router.post("/cadastrar", cadastrar);

/**
 * @swagger
 * /cliente/listar:
 *   get:
 *     tags: [Cliente]
 *     summary: Listar todos os clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get("/listar", listar);

/**
 * @swagger
 * /cliente/{id}:
 *   get:
 *     tags: [Cliente]
 *     summary: Buscar cliente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Não encontrado
 */
router.get("/:id", buscarID);

/**
 * @swagger
 * /cliente/atualizar/{id}:
 *   put:
 *     tags: [Cliente]
 *     summary: Atualizar cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente atualizado
 */
router.put("/atualizar/:id", update);

/**
 * @swagger
 * /cliente/deletar/{id}:
 *   delete:
 *     tags: [Cliente]
 *     summary: Deletar cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente deletado
 */
router.delete("/deletar/:id", delet);

module.exports = router;