import {scrapeAnimeMovies} from '../../controllers/gogoanime/anime_parser.js';

export async function handleAnimeMovies(req, res) {
    try {
        const page = req.query.page;
        const alphabet = req.query.aph;
        const data = await scrapeAnimeMovies({page: page, aph: alphabet});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
