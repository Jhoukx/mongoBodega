import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const appServer = express();

const config = JSON.parse(process.env.SERVER);

appServer.listen(config, () => {
    console.log(`Server running on http://${config.host}:${config.port}`)
});