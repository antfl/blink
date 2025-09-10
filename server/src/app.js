import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import routes from './routes.js';
import middleware from './middleware.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// 注册中间件
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(middleware.securityHeaders);

// 静态文件服务：前端资源地址
app.use(express.static(path.join(__dirname, '../../web/dist')));

// API 路由
app.use('/api', routes);

// 所有其他请求返回前端入口文件（支持 Vue Router）
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../web/dist/index.html'));
});

// 404 处理
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// 错误处理
app.use(middleware.errorHandler);

// 启动服务器
app.listen(port, () => {
    console.log(`服务运行中: http://localhost:${port}`);
    console.log(`环境: ${process.env.NODE_ENV || 'development'}`);
});