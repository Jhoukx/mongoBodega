import { con } from '../../config/connection/atlas.js'

const db = await con();
let bodegas = await db.collection('bodegas');

const getBodegas = async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.rateLimit);
    const db = await con();
    let bodegas = await db.collection('bodegas');

    const result = await bodegas.find().toArray();
    console.log('Result:\t', result);
    res.send(result);
}

export { getBodegas }
