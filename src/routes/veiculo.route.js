const express = require("express");
const router = express.Router();

const {
  cadastrar,
  listar,
  buscarID,
  update,
  delet,
} = require("../controllers/veiculo.controller");

/**
 * @swagger
 * tags:
 *   name: Veiculo
 *   description: CRUD de veículos
 */

/**
 * @swagger
 * /veiculo/cadastrar:
 *   post:
 *     tags: [Veiculo]
 *     summary: Criar veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veiculo'
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 */
router.post("/cadastrar", cadastrar);

/**
 * @swagger
 * /veiculo/listar:
 *   get:
 *     tags: [Veiculo]
 *     summary: Listar todos os veículos
 *     responses:
 *       200:
 *         description: Lista de veículos
 */
router.get("/listar", listar);

/**
 * @swagger
 * /veiculo/{id}:
 *   get:
 *     tags: [Veiculo]
 *     summary: Buscar veículo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *       404:
 *         description: Não encontrado
 */
router.get("/:id", buscarID);

/**
 * @swagger
 * /veiculo/atualizar/{id}:
 *   put:
 *     tags: [Veiculo]
 *     summary: Atualizar veículo
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
 *             $ref: '#/components/schemas/Veiculo'
 *     responses:
 *       200:
 *         description: Atualizado com sucesso
 */
router.put("/atualizar/:id", update);

/**
 * @swagger
 * /veiculo/deletar/{id}:
 *   delete:
 *     tags: [Veiculo]
 *     summary: Deletar veículo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deletado com sucesso
 */
router.delete("/deletar/:id", delet);

module.exports = router;