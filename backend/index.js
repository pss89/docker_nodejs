const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // 프론트엔드와 백엔드 포트가 달라서 발생하는 보안(CORS) 문제 해결
app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Express 백엔드에서 온 인사입니다!' });
});

app.listen(port, () => {
    console.log(`백엔드 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});