import { scrapeAnimeListPage } from '../../controllers/gogoanime/anime_parser.js';

export async function handleAnimeListPage(req, res) {
    try {
        const page = req.query.page;
        const data = await scrapeAnimeListPage({ page: page });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
