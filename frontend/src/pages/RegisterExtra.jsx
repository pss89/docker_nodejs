import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function RegisterExtra() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        registerToken: '' // 임시 가입 토큰을 담을 빈 자리
    });

    // 화면이 켜질 때 URL에서 토큰을 추출하여 상태에 저장
    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            alert('잘못된 접근입니다.');
            navigate('/login'); // 토큰이 없으면 로그인 페이지로 쫓아냄
            return;
        }
        setFormData((prev) => ({ ...prev, registerToken: token }));
    }, [searchParams, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', formData);
            alert(response.data.message);
            navigate('/login'); // 가입 성공 시 로그인 화면으로 이동
        } catch (error) {
            console.error('가입 에러:', error);
            // 백엔드에서 보낸 에러 메시지가 있다면 출력
            alert(error.response?.data?.message || '회원가입 중 문제가 발생했습니다.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>최초 1회 추가 정보 입력</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
                <input name="username" placeholder="닉네임 (아이디)" onChange={handleChange} required />
                <input name="email" type="email" placeholder="이메일" onChange={handleChange} required />
                <input name="phone" placeholder="휴대폰 번호 (ex: 010-1234-5678)" onChange={handleChange} required />
                <button type="submit">가입 완료</button>
            </form>
        </div>
    );
}

export default RegisterExtra;