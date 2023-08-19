import { Router } from "express";
import  {getBodegas, postBodega, putTrasladoBodega}  from "../controllers/bodegas.js";
import { limitGet } from "../middleware/rateLimit.js";
const appBodegas = Router();

appBodegas.get('/', limitGet(), getBodegas);
appBodegas.post('/', limitGet(), postBodega);
appBodegas.put('/traslado', limitGet(), putTrasladoBodega);
export default appBodegas;