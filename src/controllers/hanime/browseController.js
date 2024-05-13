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

export const getBrowse = async (ip) => {
    // Rate limiting logic
    const ipRequestCount = await getIPRequestCount(ip);
    if (ipRequestCount >= 10) {
        throw new Error('Rate limit exceeded');
    }
    await incrementIPRequestCount(ip);

    const cacheKey = 'browse';
    const cachedData = await getFromCache(cacheKey);

    if (cachedData) {
        return cachedData;
    } else {
        const browseUrl = 'https://hanime.tv/api/v8/browse';
        const browsedata = await jsongen(browseUrl);

        await setexToCache(cacheKey, browsedata, 3600); // Cache for 1 hour

        return browsedata;
    }
};
