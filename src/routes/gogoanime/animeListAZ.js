import { scrapeAnimeAZ } from '../../controllers/gogoanime/anime_parser.js';

export async function handleAnimeListAZ(req, res) {
    try {
        const aph = req.query.aph;
        const page = req.query.page;

        const data = await scrapeAnimeAZ({ aph: aph, page: page });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
