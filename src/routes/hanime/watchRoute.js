import express from 'express';
const router = express.Router();
import { getVideo } from '../../controllers/hanime/videoController.js';

router.get('/:slug', async (req, res, next) => {
    try {
        const { slug } = req.params;
        const jsondata = await getVideo(slug);
        res.json({ results: jsondata });
    } catch (error) {
        next(error);
    }
});

export default router;
