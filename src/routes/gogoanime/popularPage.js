import { scrapePopularPage } from '../../gogoanime/anime_parser.js';

export async function handlePopularPage(req, res) {
    try {
        const page = req.query.page;
        const data = await scrapePopularPage({ page: page });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
