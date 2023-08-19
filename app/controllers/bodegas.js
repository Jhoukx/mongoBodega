import { ObjectId } from 'mongodb';
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
        res.status(201).json({ message: "Bodega was added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(400).json({ message: "Error adding bodega :C", error: error });
    }
}

const putTrasladoBodega = async (req, res) => {
    let inventario = await db.collection("inventarios");
    if (!req.rateLimit) return;
    console.log(req.rateLimit);

    try {
        const { id_origin_storage, id_target_storage, quantity } = req.body;
        let bodegaA = await inventario.find({ ID: id_origin_storage }).toArray()
        let bodegaB = await inventario.find({ ID: id_target_storage }).toArray()

        let { quantity:quantityA,ID:idA } = bodegaA[0]
        let { quantity: quantityB,ID:idB } = bodegaB[0]
        
        if (quantityA < quantity) res.status(400).json({ status: 400, message: "You cannot transfer more products than you have" })
        console.log('ABefore',quantityA,"",'BBefore',quantityB);
        quantityA -= quantity
        quantityB += quantity
        console.log('cantidadA:', quantityA + ' quantityB:', quantityB);
        const updateBodegaA = await inventario.updateOne(
            { ID: idA },
            { $set: { quantity: quantityA } }
        )
        const updateBodegaB = await inventario.updateOne(
            { ID: idB },
            { $set: { quantity: quantityB } }
        )
        console.log('_idA:', idA + ' _idB:', idB);
        res.send({status:200,message:"The documents has been updated"})
    } catch (error) {
        res.status(400).json({status:400,message:error.message});
    } 
    res.send();
}
export { getBodegas, postBodega, putTrasladoBodega }
