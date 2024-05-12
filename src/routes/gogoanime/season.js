import { scrapeSeason } from '../../controllers/gogoanime/anime_parser.js';

export async function handleSeason(req, res) {
    try {
        const page = req.query.page;
        const season = req.params.season;
        const data = await scrapeSeason({ page: page, season: season });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
