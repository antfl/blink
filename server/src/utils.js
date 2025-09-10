import CryptoJS from 'crypto-js';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config();

// 生成设备指纹哈希
export const generateDeviceHash = (req) => {
    const fingerprint = req.headers['user-agent']
        + req.ip
        + (req.headers['accept-language'] || '');
    return CryptoJS.SHA256(fingerprint + process.env.SALT).toString();
};

// 生成短 ID (8位)
export const generateShortId = () => {
    return nanoid(8);
};

// 验证内容是否合法
export const isValidContent = (content) => {
    if (!content || typeof content !== 'string') return false;

    // 限制长度
    return content.length <= 10000;
};