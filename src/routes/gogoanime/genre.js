import {scrapeGenre} from '../../controllers/gogoanime/anime_parser.js';

export async function handleGenre(req, res) {
    try {
        const genre = req.params.genre;
        const page = req.query.page;
        const data = await scrapeGenre({genre: genre, page: page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
