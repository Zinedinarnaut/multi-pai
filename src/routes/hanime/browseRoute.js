import express from 'express';
import {getBrowse} from '../../controllers/hanime/browseController.js';

const router = express.Router();

router.get('/hentai/:type', async (req, res, next) => {
    try {
        const {type} = req.params;
        const data = await getBrowse();
        let jsondata = data[type];
        if (type === 'hentai_tags') {
            jsondata = jsondata.map((x) => ({...x, url: `/hentai-tags/${x.text}/0`}));
        } else if (type === 'brands') {
            jsondata = jsondata.map((x) => ({...x, url: `test${x.slug}/0`}));
        }
        res.json({results: jsondata});
    } catch (error) {
        next(error);
    }
});

export default router;
