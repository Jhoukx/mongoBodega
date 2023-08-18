import { Router } from "express";
import { limitGet } from "../middleware/rateLimit.js";
import { postInventario } from "../controllers/inventarios.js";

const appInventario = Router();

appInventario.post('/', limitGet(), postInventario);

export default appInventario;

