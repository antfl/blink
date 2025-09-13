import express from 'express';
import { createPaste, getPaste, getRawPaste } from './controllers.js';

const router = express.Router();

// 创建
router.post('/create', createPaste);

// 获取（HTML 渲染）
router.get('/paste/:id', getPaste);

// 获取原始（JSON 格式）
router.get('/raw/:id', getRawPaste);

// 服务状态检查
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

export default router;