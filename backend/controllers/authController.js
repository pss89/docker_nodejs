const pool = require('../config/db');
const { encrypt } = require('../utils/crypto');
const jwt = require('jsonwebtoken'); // JWT 모듈 추가

const registerSocialUser = async (req, res) => {
    // 프론트엔드에서는 providerId 대신 registerToken만 보냅니다.
    const { username, email, phone, registerToken } = req.body;

    let decodedTempData;

    // 1. 임시 토큰 검증 및 해독
    try {
        decodedTempData = jwt.verify(registerToken, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: '가입 세션이 만료되었거나 유효하지 않은 접근입니다. 다시 로그인해 주세요.' });
    }

    const { provider, providerId } = decodedTempData;
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        const encryptedEmail = encrypt(email);
        const encryptedPhone = encrypt(phone);

        const [userResult] = await conn.execute(
            'INSERT INTO users (username, email, phone) VALUES (?, ?, ?)',
            [username, encryptedEmail, encryptedPhone]
        );
        const newUserId = userResult.insertId;

        await conn.execute(
            'INSERT INTO social_accounts (user_id, provider, provider_id) VALUES (?, ?, ?)',
            [newUserId, provider, providerId]
        );

        await conn.commit();
        res.status(201).json({ message: '회원가입이 완료되었습니다.', userId: newUserId });

    } catch (error) {
        await conn.rollback();
        console.error('DB 에러:', error);
        res.status(500).json({ message: '서버 에러 발생' });
    } finally {
        conn.release(); 
    }
};

module.exports = { registerSocialUser };