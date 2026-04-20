// backend/config/db.js
const mysql = require('mysql2/promise');

// 도커 컴포즈가 주입해준 환경 변수를 그대로 사용합니다.
const pool = mysql.createPool({
    host: process.env.DB_HOST,         // docker-compose.yml에서 'db'로 설정됨
    user: process.env.DB_USER,         // 'react_node_user'
    password: process.env.DB_PASSWORD, // 'ReactNode@20260418'
    database: process.env.DB_NAME,     // 'react_node_db'
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;