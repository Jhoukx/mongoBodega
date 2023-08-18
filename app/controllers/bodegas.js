import { con } from '../../config/connection/atlas.js'
import { incrementID } from './counter.js';

const db = await con();
let bodegas = await db.collection('bodegas');

const getBodegas = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    const result = await bodegas.find().toArray();
    res.send(result);
}

const postBodega = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    const { nombre_bodega, id_responsable, estado_bodega, creado_por, creado_fecha } = req.body;
    const bodegaId = await incrementID("bodegas");
    try {
        const result = await bodegas.insertOne({
            ID: bodegaId,
            name: nombre_bodega,
            id_responsible: id_responsable,
            status: estado_bodega,
            created_by: creado_por,
            created_at: new Date(creado_fecha)
        });
        console.log(result);
        res.status(201).json({ message: "Bodega is added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(400).json({ message: "Error adding bodega :C", error: error });
    }
}
export { getBodegas, postBodega }
