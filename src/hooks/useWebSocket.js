import { useEffect, useCallback } from 'react';

export function useWebSocket(onProgress, onError) {
  useEffect(() => {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = import.meta.env.VITE_API_URL.replace(/^https?:\/\//, '');
    const ws = new WebSocket(`${wsProtocol}//${wsHost}/ws`);

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