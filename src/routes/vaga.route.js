const express = require("express");
const router = express.Router();

const {
  cadastrar,
  listar,
  buscarID,
  update,
  delet,
} = require("../controllers/vaga.controller");

/**
 * @swagger
 * tags:
 *   name: Vaga
 *   description: CRUD de vagas do estacionamento
 */

/**
 * @swagger
 * /vaga/cadastrar:
 *   post:
 *     tags: [Vaga]
 *     summary: Criar vaga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vaga'
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 */
router.post("/cadastrar", cadastrar);

/**
 * @swagger
 * /vaga/listar:
 *   get:
 *     tags: [Vaga]
 *     summary: Listar todas as vagas
 *     responses:
 *       200:
 *         description: Lista de vagas
 */
router.get("/listar", listar);

/**
 * @swagger
 * /vaga/{id}:
 *   get:
 *     tags: [Vaga]
 *     summary: Buscar vaga por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vaga encontrada
 *       404:
 *         description: Não encontrada
 */
router.get("/:id", buscarID);

/**
 * @swagger
 * /vaga/atualizar/{id}:
 *   put:
 *     tags: [Vaga]
 *     summary: Atualizar vaga
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
 *             $ref: '#/components/schemas/Vaga'
 *     responses:
 *       200:
 *         description: Vaga atualizada
 */
router.put("/atualizar/:id", update);

/**
 * @swagger
 * /vaga/deletar/{id}:
 *   delete:
 *     tags: [Vaga]
 *     summary: Deletar vaga
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vaga deletada
 */
router.delete("/deletar/:id", delet);

module.exports = router;