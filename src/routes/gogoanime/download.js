import axios from 'axios';
import {DownloadReferer} from '../../controllers/gogoanime/anime_parser.js';

export async function handleDownload(req, res) {
    try {
        const downloadLink = req.rawHeaders.find(
            (x) => x.includes('https://') && x.includes('.mp4')
        );

        if (!downloadLink) {
            return res.status(400).json({
                error: 'No downloadLink provided. Make sure to add the downloadLink in the headers.',
            });
        }

        await axios
            .get(downloadLink, {
                headers: {Referer: DownloadReferer},
                responseType: 'stream',
            })
            .then((stream) => {
                return new Promise((r, j) => {
                    res.writeHead(200, {
                        ...stream.headers,
                    });
                    stream.data.pipe(res);
                });
            });

        return res.status(200).json('Done Downloading.');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            error: 'Internal Error',
            message: err,
        });
    }
}
