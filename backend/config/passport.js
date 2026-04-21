const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const pool = require('./db');

// 공통 처리 로직: DB를 조회하여 신규/기존 유저 판별
const verifySocialUser = async (provider, profile, done) => {
    try {
        const providerId = profile.id; // 소셜 플랫폼에서 넘겨주는 고유 식별자

        // 1. social_accounts 테이블 조회
        const [rows] = await pool.execute(
            'SELECT user_id FROM social_accounts WHERE provider = ? AND provider_id = ?',
            [provider, String(providerId)]
        );

        if (rows.length > 0) {
            // 기존 회원: DB에 있는 user_id를 넘겨줌
            return done(null, { isNew: false, userId: rows[0].user_id });
        } else {
            // 신규 회원: 프론트엔드(React)로 정보를 넘기기 위해 상태를 저장
            return done(null, { isNew: true, provider: provider, providerId: providerId });
        }
    } catch (error) {
        return done(error);
    }
};

// 1. 카카오 인증 전략
passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID || 'c47d6e94f8884098da4dd09662e902a3', // <-- 값이 없으면 임시 문자열 대체
    clientSecret: process.env.KAKAO_CLIENT || 'WPMOZgo8ux9FI4s0fbpNuqHMw3bIHPrG', // <-- 값이 없으면 임시 문자열 대체
    callbackURL: 'http://localhost:5000/api/auth/kakao/callback'
}, (accessToken, refreshToken, profile, done) => {
    verifySocialUser('kakao', profile, done);
}));

// 2. 네이버 인증 전략
passport.use(new NaverStrategy({
    clientID: process.env.NAVER_CLIENT_ID || 'eRUnIQvr8s2L0SkCmojz',       // <-- 수정
    clientSecret: process.env.NAVER_CLIENT_SECRET || 'fgoZaPxC_M', // <-- 수정
    callbackURL: 'http://localhost:5000/api/auth/naver/callback'
}, (accessToken, refreshToken, profile, done) => {
    verifySocialUser('naver', profile, done);
}));

module.exports = passport;