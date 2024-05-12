import express from 'express';
import {getBrowse} from '../../controllers/hanime/browseController.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await getBrowse();
        const jsondata = data.hentai_tags.map((x) => ({...x, url: `/tags/${x.text}/0`}));
        res.json({results: jsondata});
    } catch (error) {
        next(error);
    }
});

export default router;
