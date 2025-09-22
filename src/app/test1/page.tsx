'use client';

import { useState } from 'react';
import { usePreventLeave } from '@/hooks/usePreventLeave';

export default function Test1() {
  const [inputValue, setInputValue] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // 이탈 방지 훅 사용
  const { navigateWithConfirmation } = usePreventLeave({
    hasUnsavedChanges,
    message: '입력한 내용이 저장되지 않았습니다. 정말 페이지를 떠나시겠습니까?'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // 저장 로직 (예시)
    console.log('저장됨:', inputValue);
    setHasUnsavedChanges(false);
    alert('저장되었습니다!');
  };

  const handleNavigateToTest2 = () => {
    navigateWithConfirmation('/test2');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Test1 페이지</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="input">텍스트 입력:</label>
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="여기에 텍스트를 입력하세요..."
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleSave}
          disabled={!hasUnsavedChanges}
          style={{
            padding: '10px 20px',
            backgroundColor: hasUnsavedChanges ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: hasUnsavedChanges ? 'pointer' : 'not-allowed',
            marginRight: '10px'
          }}
        >
          저장
        </button>
        
        <button
          onClick={handleNavigateToTest2}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test2로 이동
        </button>
      </div>

      <div style={{ 
        padding: '10px', 
        backgroundColor: hasUnsavedChanges ? '#fff3cd' : '#d4edda',
        border: `1px solid ${hasUnsavedChanges ? '#ffeaa7' : '#c3e6cb'}`,
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        {hasUnsavedChanges ? (
          <span style={{ color: '#856404' }}>
            ⚠️ 저장되지 않은 변경사항이 있습니다.
          </span>
        ) : (
          <span style={{ color: '#155724' }}>
            ✅ 모든 변경사항이 저장되었습니다.
          </span>
        )}
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h3>테스트 방법:</h3>
        <ul>
          <li>텍스트를 입력한 후 <strong>뒤로가기</strong> 버튼을 눌러보세요</li>
          <li>텍스트를 입력한 후 <strong>새로고침</strong>을 해보세요</li>
          <li>텍스트를 입력한 후 <strong>Test2로 이동</strong> 버튼을 눌러보세요</li>
          <li>텍스트를 입력한 후 <strong>브라우저 탭을 닫으려고</strong> 해보세요</li>
        </ul>
      </div>
    </div>
  );
}
