import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface UsePreventLeaveOptions {
  hasUnsavedChanges: boolean;
  message?: string;
}

export function usePreventLeave({ 
  hasUnsavedChanges, 
  message = '변경사항이 저장되지 않았습니다. 정말 페이지를 떠나시겠습니까?' 
}: UsePreventLeaveOptions) {
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    // 사용자 상호작용 감지 (beforeunload 이벤트가 작동하려면 필요)
    const handleUserInteraction = () => {
      hasInteractedRef.current = true;
    };

    // 새로고침, 브라우저 닫기, 탭 닫기 감지
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && hasInteractedRef.current) {
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    // 뒤로가기 감지를 위한 history 조작
    const handlePopState = (event: PopStateEvent) => {
      if (hasUnsavedChanges) {
        // 현재 상태를 다시 push하여 뒤로가기를 무효화
        window.history.pushState(null, '', window.location.pathname);
        
        // 사용자에게 확인 요청
        const shouldLeave = window.confirm(message);
        if (shouldLeave) {
          // 사용자가 확인하면 실제로 뒤로가기 실행
          window.history.back();
        }
        // 사용자가 취소하면 현재 페이지에 머물기 (이미 pushState로 처리됨)
      }
    };

    // 사용자 상호작용 이벤트 리스너들
    const interactionEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    interactionEvents.forEach(eventType => {
      document.addEventListener(eventType, handleUserInteraction, { once: true });
    });

    // beforeunload 이벤트 리스너 등록
    window.addEventListener('beforeunload', handleBeforeUnload);

    // popstate 이벤트 리스너 등록 (뒤로가기 감지)
    window.addEventListener('popstate', handlePopState);

    // 페이지 로드 시 history state 추가 (뒤로가기 감지를 위해)
    if (hasUnsavedChanges) {
      window.history.pushState(null, '', window.location.pathname);
    }

    return () => {
      // 이벤트 리스너 정리
      interactionEvents.forEach(eventType => {
        document.removeEventListener(eventType, handleUserInteraction);
      });
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasUnsavedChanges, message]);

  // 프로그래밍 방식으로 페이지 이동할 때 사용할 함수
  const navigateWithConfirmation = (url: string) => {
    if (hasUnsavedChanges) {
      const shouldLeave = window.confirm(message);
      if (!shouldLeave) {
        return false;
      }
    }
    isNavigatingRef.current = true;
    router.push(url);
    return true;
  };

  return { navigateWithConfirmation };
}
