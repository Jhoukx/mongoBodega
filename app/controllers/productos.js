import { con } from '../../config/connection/atlas.js';
import { incrementID } from './counter.js';

const db = await con();
const producto = await db.collection('producto');

const postProduct = async (req,res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    const { nombre_producto, estado_producto, creado_por, creado_fecha } = req.body;
    const productoId = await incrementID("productos");
    try {
        let result = await producto.insertOne({
            ID: productoId,
            name: nombre_producto,
            status: estado_producto,
            created_by: creado_por,
            created_at: new Date(creado_fecha)
        });
        console.log(result);
        res.status(201).json({ message: "Producto is added successfully", insertedId: result.insertedId })
    } catch (error) {
        res.status(400).json({status:400,message:error.message})
    }
}

export {postProduct}