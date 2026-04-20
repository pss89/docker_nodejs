// backend/controllers/authController.js
const pool = require('../config/db');
const { encrypt } = require('../utils/crypto');

const registerSocialUser = async (req, res) => {
    const { username, email, phone, provider, providerId } = req.body;
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
        res.status(201).json({ message: '회원가입 완료', userId: newUserId });

    } catch (error) {
        await conn.rollback();
        console.error('DB 에러:', error);
        res.status(500).json({ message: '서버 에러 발생' });
    } finally {
        conn.release(); 
    }
};

module.exports = { registerSocialUser };