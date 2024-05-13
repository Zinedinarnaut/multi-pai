import axios from 'axios';
import crypto from 'crypto';
import UserAgent from 'fake-useragent';
import {getFromCache, setexToCache} from '../../modules/redis/redisCache.js';

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

export const getVideo = async (slug) => {
    const cacheKey = `video:${slug}`;
    const cachedData = await getFromCache(cacheKey);

    if (cachedData) {
        return cachedData;
    } else {
        const videoApiUrl = 'https://hanime.tv/api/v8/video?id=';
        const videoDataUrl = videoApiUrl + slug;
        const videoData = await jsongen(videoDataUrl);
        const tags = videoData.hentai_tags.map((t) => ({
            name: t.text,
            link: `/hentai-tags/${t.text}/0`,
        }));
        const streams = videoData.videos_manifest.servers[0].streams.map((s) => ({
            width: s.width,
            height: s.height,
            size_mbs: s.filesize_mbs,
            url: s.url,
        }));
        const episodes = videoData.hentai_franchise_hentai_videos.map((e) => ({
            id: e.id,
            name: e.name,
            slug: e.slug,
            cover_url: e.cover_url,
            views: e.views,
            link: `/watch/${e.slug}`,
        }));
        const jsondata = {
            id: videoData.hentai_video.id,
            name: videoData.hentai_video.name,
            description: videoData.hentai_video.description,
            poster_url: videoData.hentai_video.poster_url,
            cover_url: videoData.hentai_video.cover_url,
            views: videoData.hentai_video.views,
            streams: streams,
            tags: tags,
            episodes: episodes,
        };

        await setexToCache(cacheKey, jsondata, 3600); // Cache for 1 hour

        return [jsondata];
    }
};
