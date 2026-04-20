// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// app.use(cors()); // 프론트엔드와 백엔드 포트가 달라서 발생하는 보안(CORS) 문제 해결
// app.use(express.json());

// app.get('/api/hello', (req, res) => {
//     res.json({ message: 'Express 백엔드에서 온 인사입니다!' });
// });

// app.listen(port, () => {
//     console.log(`백엔드 서버가 http://localhost:${port} 에서 실행 중입니다.`);
// });

// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

// 라우터 등록
app.use('/api/auth', authRoutes);

app.get('/api/hello', (req, res) => {
    res.json({ message: '도커 내부에서 Express 백엔드가 구동 중입니다!' });
});

app.listen(port, () => {
    console.log(`백엔드 서버 대기 중 (포트: ${port})`);
});