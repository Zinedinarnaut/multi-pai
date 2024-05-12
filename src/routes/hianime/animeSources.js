import express from 'express';
import { getSources } from '../../controllers/hianime/helpers/utils/methods.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { serverId, episodeId } = req.query;
    if (!serverId || !episodeId) {
        res.status(400).json({ message: 'Provide server Id & episode Id !' });
    } else {
        const data = await getSources(serverId, episodeId);
        if (!data) {
            res.status(500).json({ message: 'Internal server issue !' });
        } else {
            res.json({ data });
        }
    }
});

export default router;
