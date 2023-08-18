import { Router } from "express";
import  {getBodegas, postBodega}  from "../controllers/bodegas.js";
import { limitGet } from "../middleware/rateLimit.js";
const appBodegas = Router();

appBodegas.get('/', limitGet(), getBodegas);
appBodegas.post('/', limitGet(), postBodega);
export default appBodegas;