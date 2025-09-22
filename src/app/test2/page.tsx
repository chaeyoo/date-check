'use client';

import Link from 'next/link';

export default function Test2() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Test2 페이지</h1>
      <p>Test2 페이지에 도착했습니다!</p>
      
      <Link 
        href="/test1"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          marginTop: '20px'
        }}
      >
        Test1로 돌아가기
      </Link>
    </div>
  );
}
