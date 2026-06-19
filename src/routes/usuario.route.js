const express = require("express");
const router = express.Router();

const {
  cadastrar,
  listar,
  delet,
  update,
  buscarID,
} = require("../controllers/usuario.controller.js");

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: CRUD de usuários do sistema
 */

/**
 * @swagger
 * /usuario/cadastrar:
 *   post:
 *     tags: [Usuario]
 *     summary: Criar usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/cadastrar", cadastrar);

/**
 * @swagger
 * /usuario/listar:
 *   get:
 *     tags: [Usuario]
 *     summary: Listar todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/listar", listar);

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     tags: [Usuario]
 *     summary: Buscar usuário por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Não encontrado
 */
router.get("/:id", buscarID);

/**
 * @swagger
 * /usuario/atualizar/{id}:
 *   put:
 *     tags: [Usuario]
 *     summary: Atualizar usuário
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
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
router.put("/atualizar/:id", update);

/**
 * @swagger
 * /usuario/deletar/{id}:
 *   delete:
 *     tags: [Usuario]
 *     summary: Deletar usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado
 */
router.delete("/deletar/:id", delet);

module.exports = router;