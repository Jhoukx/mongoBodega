import { Router } from "express";


const appBodegas = Router();

appBodegas.use('/', (req,res) => {
   res.send('/bodegas') 
});

export default appBodegas;