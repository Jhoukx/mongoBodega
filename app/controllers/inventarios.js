import { con } from '../../config/connection/atlas.js';

const db = await con();
const inventario = db.collection("inventarios");

const postInventario = async (req,res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const { id_bodega, id_producto, cantidad_inventario } = req.body;
    try {
        let result = await inventario.aggregate([
            {
                $match: {
                    id_storage: { $eq: id_bodega },
                    id_product: { $eq: id_producto }
                }
            }
        ]).toArray();              
        const data = {
            id_storage: id_bodega,
            id_product: id_producto,
            quantity: cantidad_inventario
        }
        switch (Object.keys(result).length) {
            
            case undefined:
                console.log('Sin relacion');
                inventario.insertOne({data});
                break
            default:
                console.log('Con relación');
                inventario.updateOne(
                    { id: result._id },
                    { $set: data }    
                )
        }
        res.send(result)
    } catch (error) {
        res.status(404).json({status:404, message:error.message});
    }
}

export {postInventario}