import express from "express";
import dotenv from 'dotenv';
import appBodegas from "./app/routes/bodegas.routes.js";
dotenv.config();

const appServer = express();

appServer.use(express.json());


appServer.use("/bodegas",appBodegas);

const config = JSON.parse(process.env.SERVER);
appServer.listen(config, () => {
    console.log(`Server running on http://${config.host}:${config.port}`)
});