require('dotenv').config();

const express = require("express");
const cors = require ("cors");
const app = express();

const usuarioRoute = require ("./src/routes/usuario.route.js");
const clienteRoute = require ("./src/routes/cliente.route.js");
const veiculoRoute = require ("./src/routes/veiculo.route.js");
const vagaRoute = require ("./src/routes/vaga.route.js");
const movimentacaoRoute = require ("./src/routes/movimentacao.route.js");

app.use(express.json());
app.use(cors());

app.use("/usuario", usuarioRoute);
app.use("/clientre", clienteRoute);
app.use("/veiculo", veiculoRoute);
app.use("/vaga", vagaRoute);
app.use("/movimentacao", movimentacaoRoute);



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Servidor rodando http://localhost:${PORT}`);
})