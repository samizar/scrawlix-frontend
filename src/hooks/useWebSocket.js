import { useEffect, useCallback } from 'react';

export function useWebSocket(onProgress, onError) {
  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.hostname}:3000`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'progress') {
        onProgress(data.data);
      } else if (data.type === 'error') {
        onError(data.data);
      }
    };

    return () => {
      ws.close();
    };
  }, [onProgress, onError]);
} 