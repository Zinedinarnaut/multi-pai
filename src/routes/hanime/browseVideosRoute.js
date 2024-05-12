import express from 'express';
const router = express.Router();
import { getBrowseVideos } from '../../controllers/hanime/browseVideosController.js';

router.get('/:type/:category/:page', async (req, res, next) => {
    try {
        const { type, category, page } = req.params;
        const data = await getBrowseVideos(type, category, page);
        const nextPage = `/${type}/${category}/${parseInt(page) + 1}`;
        res.json({ results: data, next_page: nextPage });
    } catch (error) {
        next(error);
    }
});

export default router;
