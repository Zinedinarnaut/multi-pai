import { scrapeNewSeason } from '../../controllers/gogoanime/anime_parser.js';

export async function handleNewSeason(req, res) {
    try {
        const page = req.query.page;
        const data = await scrapeNewSeason({ page: page });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
