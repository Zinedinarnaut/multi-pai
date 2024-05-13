import axios from 'axios';
import crypto from 'crypto';
import UserAgent from 'fake-useragent';
import { getFromCache, setexToCache, incrementIPRequestCount, getIPRequestCount } from '../../modules/redis/redisCache.js';

const jsongen = async (url) => {
    try {
        const headers = {
            'X-Signature-Version': 'web2',
            'X-Signature': crypto.randomBytes(32).toString('hex'),
            'User-Agent': new UserAgent().random,
        };
        const res = await axios.get(url, { headers });
        return res.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};

export const getBrowseVideos = async (ip, type, category, page) => {
    // Rate limiting logic
    const ipRequestCount = await getIPRequestCount(ip);
    if (ipRequestCount >= 10) {
        throw new Error('Rate limit exceeded');
    }
    await incrementIPRequestCount(ip);

    const cacheKey = `browse:${type}:${category}:${page}`;
    const cachedData = await getFromCache(cacheKey);

    if (cachedData) {
        return cachedData;
    } else {
        const browseUrl = `https://hanime.tv/api/v8/browse/${type}/${category}?page=${page}&order_by=views&ordering=desc`;
        const browsedata = await jsongen(browseUrl);
        const parsedData = browsedata.hentai_videos.map((x) => ({
            id: x.id,
            name: x.name,
            slug: x.slug,
            cover_url: x.cover_url,
            views: x.views,
            link: `/video/${x.slug}`,
        }));

        await setexToCache(cacheKey, parsedData, 3600); // Cache for 1 hour

        return parsedData;
    }
};
