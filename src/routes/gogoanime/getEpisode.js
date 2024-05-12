import {scrapeWatchAnime} from '../../controllers/gogoanime/anime_parser.js';

export async function handleGetEpisode(req, res) {
    try {
        const id = req.params.id;
        const data = await scrapeWatchAnime({id: id});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
