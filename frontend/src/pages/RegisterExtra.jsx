import React, { useState } from 'react';
import api from '../services/api';

function RegisterExtra() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        provider: 'google', // 임시 값
        providerId: 'temp_id_' + Date.now() // 임시 값
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 우리가 만든 백엔드 API로 데이터 전송
            const response = await api.post('/auth/register', formData);
            alert(response.data.message); // "회원가입 완료" 알림창
            // 추후 홈화면으로 이동하는 로직 추가
        } catch (error) {
            console.error('가입 에러:', error);
            alert('회원가입 중 문제가 발생했습니다.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>최초 1회 추가 정보 입력</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
                <input name="username" placeholder="닉네임 (아이디)" onChange={handleChange} required />
                <input name="email" type="email" placeholder="이메일" onChange={handleChange} required />
                <input name="phone" placeholder="휴대폰 번호" onChange={handleChange} required />
                <button type="submit">가입 완료</button>
            </form>
        </div>
    );
}

export default RegisterExtra;