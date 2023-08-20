import express from "express";
import dotenv from 'dotenv';
import appBodegas from "./app/routes/bodegas.routes.js";
import appProducto from "./app/routes/productos.routes.js";
import appInventario from "./app/routes/inventario.routes.js";
import { createToken } from "./app/middleware/token.js";
dotenv.config();

const appServer = express();

appServer.use(express.json());


appServer.use("/bodegas", appBodegas);
appServer.use('/productos', appProducto)
appServer.use('/inventarios', appInventario);
appServer.use('/token',createToken)

const config = JSON.parse(process.env.SERVER);
appServer.listen(config, () => {
    console.log(`Server running on http://${config.host}:${config.port}`)
});