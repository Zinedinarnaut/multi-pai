import {scrapeThread} from '../../controllers/gogoanime/anime_parser.js';

export async function handleThread(req, res) {
    try {
        const episodeId = req.params.episodeId;
        const page = req.query.page;
        const data = await scrapeThread({episodeId: episodeId, page: page});

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
