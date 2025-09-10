import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    db: process.env.REDIS_DB || 0
});

// Redis 连接
redis.ping().then(() => {
    console.log('Redis 连接成功...');
}).catch(err => {
    console.error('Redis 连接错误:', err);
});

export default redis;