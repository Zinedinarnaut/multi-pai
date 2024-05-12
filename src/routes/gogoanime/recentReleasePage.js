import { scrapeRecentPage } from '../../gogoanime/anime_parser.js';

export async function handleRecentReleasePage(req, res) {
    try {
        const page = req.query.page;
        const type = req.query.type;
        const data = await scrapeRecentPage({ page: page, type: type });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
