import { Router } from "express";
import  {getBodegas}  from "../controllers/bodegas.js";
import { limitGet } from "../middleware/rateLimit.js";

const appBodegas = Router();

appBodegas.get('/', limitGet(), getBodegas);

export default appBodegas;