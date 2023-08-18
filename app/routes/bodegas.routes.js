import { Router } from "express";
//import  {getBodegas}  from "../controllers/bodegas.js";
import { limitGet } from "../middleware/rateLimit.js";
import { con } from '../../config/connection/atlas.js'

const appBodegas = Router();




appBodegas.get('/', limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const db = await con();
    let bodegas = await db.collection('bodegas');

    const result = await bodegas.find().toArray();
    console.log('Result:\t', result);
    res.send(result);
});

export default appBodegas;