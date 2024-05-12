import express from 'express';
import {getServers} from '../../controllers/hianime/helpers/utils/methods.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await getServers(id);
    if (!data) {
        res.status(500).json({message: 'Internal server issue !'});
    } else {
        res.json({data});
    }
});

export default router;
