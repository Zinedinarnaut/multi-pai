import express from 'express';
const router = express.Router();
import { getTrending } from '../../controllers/hanime/trendingController.js';

router.get('/:time/:page', async (req, res, next) => {
    try {
        const { time, page } = req.params;
        const jsondata = await getTrending(time, page);
        const nextPage = `/trending/${time}/${parseInt(page) + 1}`;
        res.json({ results: jsondata, next_page: nextPage });
    } catch (error) {
        next(error);
    }
});

export default router;
