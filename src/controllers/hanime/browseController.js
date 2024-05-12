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

export const getBrowse = async () => {
    const browseUrl = 'https://hanime.tv/api/v8/browse';
    return await jsongen(browseUrl);
};
