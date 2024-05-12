import axios from 'axios';
import crypto from 'crypto';
import UserAgent from 'fake-useragent';

const jsongen = async (url) => {
    try {
        const headers = {
            'X-Signature-Version': 'web2',
            'X-Signature': crypto.randomBytes(32).toString('hex'),
            'User-Agent': new UserAgent().random,
        };
        const res = await axios.get(url, {headers});
        return res.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};

export const getTrending = async (time, page) => {
    const url = `https://hanime.tv/api/v8/browse-trending?time=${time}&page=${page}&order_by=views&ordering=desc`;
    const urldata = await jsongen(url);
    return urldata.hentai_videos.map((x) => ({
        id: x.id,
        name: x.name,
        slug: x.slug,
        cover_url: x.cover_url,
        views: x.views,
        link: `/watch/${x.slug}`,
    }));
};
