import React from 'react';

function Login() {
    const handleSocialLogin = (provider) => {
        // 추후 실제 백엔드의 소셜 로그인 주소로 이동시킬 예정입니다.
        alert(`${provider} 로그인 시도! (백엔드 연동 예정)`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>소셜 로그인</h2>
            <button onClick={() => handleSocialLogin('Google')}>Google로 로그인</button>
            <button onClick={() => handleSocialLogin('Kakao')} style={{ marginLeft: '10px' }}>Kakao로 로그인</button>
        </div>
    );
}

export default Login;