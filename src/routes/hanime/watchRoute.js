import express from 'express';
import {getVideo} from '../../controllers/hanime/videoController.js';

const router = express.Router();

router.get('/:slug', async (req, res, next) => {
    try {
        const {slug} = req.params;
        const jsondata = await getVideo(slug);
        res.json({results: jsondata});
    } catch (error) {
        next(error);
    }
});

export default router;
