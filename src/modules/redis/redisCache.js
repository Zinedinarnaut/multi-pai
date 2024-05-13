// redisCache.js
import IORedis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://default:upxzipxPnOaHomPmFTWYTuYxyJexaUZW@viaduct.proxy.rlwy.net:47369';

const client = new IORedis(REDIS_URL);

client.on('error', (err) => {
    console.error(`Redis error: ${err}`);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('close', () => {
    console.log('Connection to Redis closed');
});

client.on('reconnecting', () => {
    console.log('Reconnecting to Redis');
});

const getFromCache = async (key) => {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error(`Error getting data from Redis: ${err}`);
        throw err;
    }
};

const setexToCache = async (key, data, expiration) => {
    try {
        await client.setex(key, expiration, JSON.stringify(data));
    } catch (err) {
        console.error(`Error setting data in Redis: ${err}`);
        throw err;
    }
};

const incrementIPRequestCount = async (ip) => {
    try {
        const currentCount = await client.incr(ip);
        if (currentCount === 1) {
            // Set expiration time for IP address key if it's the first request
            await client.expire(ip, 3600); // Expiring after 1 hour
        }
        return currentCount;
    } catch (err) {
        console.error(`Error incrementing request count for IP ${ip}: ${err}`);
        throw err;
    }
};

const getIPRequestCount = async (ip) => {
    try {
        const count = await client.get(ip);
        return count ? parseInt(count, 10) : 0;
    } catch (err) {
        console.error(`Error getting request count for IP ${ip}: ${err}`);
        throw err;
    }
};

export { getFromCache, setexToCache, incrementIPRequestCount, getIPRequestCount };
