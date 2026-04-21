const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { registerSocialUser } = require('../controllers/authController');

// 기존의 최초 1회 추가 정보 입력(로컬 정보 가입) 라우트
router.post('/register', registerSocialUser);

// ==========================================
// 카카오 로그인 라우트
// ==========================================
// 1. React에서 이 주소로 접속하면 카카오 로그인 창으로 이동
router.get('/kakao', passport.authenticate('kakao', { session: false }));

// 2. 카카오 로그인 성공 후 백엔드로 돌아오는 주소
router.get('/kakao/callback', passport.authenticate('kakao', { session: false, failureRedirect: 'http://localhost:5173/login' }), (req, res) => {
    handleSocialCallback(req, res);
});

// ==========================================
// 네이버 로그인 라우트
// ==========================================
// 1. React에서 이 주소로 접속하면 네이버 로그인 창으로 이동
router.get('/naver', passport.authenticate('naver', { session: false }));

// 2. 네이버 로그인 성공 후 백엔드로 돌아오는 주소
router.get('/naver/callback', passport.authenticate('naver', { session: false, failureRedirect: 'http://localhost:5173/login' }), (req, res) => {
    handleSocialCallback(req, res);
});

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'v9M54Cnsg708AhEZogVxRR4HCYBHQjZyqAFKUOnPF1A=';

// ==========================================
// 공통 콜백 처리 함수 (프론트엔드로 화면 전환)
// ==========================================
// ... (상단 생략) ...
function handleSocialCallback(req, res) {
    const user = req.user;

    if (user.isNew) {
        // [수정된 부분] 신규 회원: 식별자 정보를 담은 '15분짜리 임시 토큰' 발행
        const registerToken = jwt.sign(
            { provider: user.provider, providerId: user.providerId },
            JWT_SECRET_KEY,
            { expiresIn: '15m' } // 15분 내에 가입을 완료해야 함
        );
        res.redirect(`http://localhost:5173/register?token=${registerToken}`);
    } else {
        // 기존 회원: 메인 화면용 2시간짜리 정식 로그인 토큰 발행
        const loginToken = jwt.sign({ userId: user.userId }, JWT_SECRET_KEY, { expiresIn: '2h' });
        res.redirect(`http://localhost:5173/?token=${loginToken}`);
    }
}

module.exports = router;