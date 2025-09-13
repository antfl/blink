import rateLimit from 'express-rate-limit';

// 请求频率限制
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 50, // 每个 IP 限制 100 次请求
    message: '请求过于频繁，请稍后再试'
});

// 安全头设置
export const securityHeaders = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
};

// 错误处理
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('服务器错误');
};

export default {
    apiLimiter,
    securityHeaders,
    errorHandler
}