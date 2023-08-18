import { Router } from "express";
import { limitGet } from "../middleware/rateLimit.js";
import { postProduct } from "../controllers/productos.js";

const appProducto = Router();

appProducto.post("/", limitGet(), postProduct);

export default  appProducto;
