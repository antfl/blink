import redis from './redis.js';
import {
    generateDeviceHash,
    generateShortId,
    isValidContent
} from './utils.js';

// 创建
export const createPaste = async (req, res) => {
    try {
        const { content, expiresIn = process.env.DEFAULT_EXPIRY } = req.body;

        // 验证内容
        if (!isValidContent(content)) {
            return res.status(400).json({
                error: '内容无效。必须是少于 10,000 个字符的字符串。'
            });
        }

        const deviceHash = generateDeviceHash(req);
        const id = generateShortId();

        // 存储到 Redis
        await redis.setex(
            `paste:${id}`,
            expiresIn,
            JSON.stringify({ content, deviceHash })
        );

        res.json({
            success: true,
            id,
            expiresIn,
            url: `${req.protocol}://${req.get('host')}/p/${id}`
        });
    } catch (error) {
        console.error('创建失败:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
};

// 获取
export const getPaste = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await redis.get(`paste:${id}`);

        if (!data) {
            return res.status(404).send('内容已过期或不存在');
        }

        const paste = JSON.parse(data);
        res.send(paste.content);
    } catch (error) {
        console.error('获取失败:', error);
        res.status(500).send('服务器内部错误');
    }
};

// 获取原始（JSON 格式）
export const getRawPaste = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await redis.get(`paste:${id}`);

        if (!data) {
            return res.status(404).json({ error: '内容已过期或不存在' });
        }

        const paste = JSON.parse(data);
        res.json({
            id,
            content: paste.content,
            created: new Date(),
            expires: new Date(Date.now() + (await redis.ttl(`paste:${id}`)) * 1000)
        });
    } catch (error) {
        console.error('获取原始失败:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
};