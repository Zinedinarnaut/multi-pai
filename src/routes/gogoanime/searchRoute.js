import {scrapeSearch} from '../../controllers/gogoanime/anime_parser.js';

export async function handleSearch(req, res) {
    try {
        const keyw = req.query.keyw;
        const page = req.query.page;

        const data = await scrapeSearch({keyw: keyw, page: page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
