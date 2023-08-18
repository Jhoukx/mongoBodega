import express from "express";
import dotenv from 'dotenv';
import appBodegas from "./app/routes/bodegas.routes.js";
dotenv.config();

const appServer = express();

const config = JSON.parse(process.env.SERVER);

appServer.use("/bodegas",appBodegas);

appServer.listen(config, () => {
    console.log(`Server running on http://${config.host}:${config.port}`)
});