import { Router } from "express";
import dotenv from 'dotenv';
import { SignJWT, jwtVerify } from "jose";
import { con } from "../../config/connection/atlas.js";
dotenv.config({ path: '../../.env' });

const createToken = Router();

const db = await con();
const rol = await db.collection('rol');

createToken.get('/:colleccion', async (req, res) => {
    const { colleccion } = req.params;
    let result = undefined;

    try {
        result = await rol.aggregate([{ $match: { name: colleccion } }, { $project: { _id: 1 } }]).toArray()

        const encoder = new TextEncoder();
        const jwtconstructor = new SignJWT(result[0]);
        const jwt = await jwtconstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("30m")
            .sign(encoder.encode(process.env.JWT_PASSWORD));
        res.send(jwt)
    } catch (error) {
        res.status(404).send({ status: 404, message: "Collection not found" })
    }   
});

export { createToken}