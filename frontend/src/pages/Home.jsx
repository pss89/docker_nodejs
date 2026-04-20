import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>커뮤니티 메인 게시판</h1>
            <p>여기에 게시글 목록이 나타날 예정입니다.</p>
            <Link to="/login"><button>로그인 화면으로 이동</button></Link>
        </div>
    );
}

export default Home;