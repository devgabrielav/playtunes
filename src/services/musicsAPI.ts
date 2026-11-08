import { AlbumType, SongType } from '../types';

const fetchWithJsonpFallback = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch {
    return new Promise<T>((resolve, reject) => {
      const callbackName = `itunes_cb_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const script = document.createElement('script');
      const separator = url.includes('?') ? '&' : '?';

      const cleanup = () => {
        delete (window as unknown as Record<string, unknown>)[callbackName];
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };

      (window as unknown as Record<string, unknown>)[callbackName] = (data: T) => {
        cleanup();
        resolve(data);
      };

      script.onerror = () => {
        cleanup();
        reject(new Error('Failed to fetch data from iTunes API'));
      };

      script.src = `${url}${separator}callback=${callbackName}`;
      document.body.appendChild(script);
    });
  }
};

const getMusics = async (id: string): Promise<[AlbumType, ...SongType[]]> => {
  const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(id)}&entity=song`;
  const requestJson = await fetchWithJsonpFallback<{ results: [AlbumType, ...SongType[]] }>(url);
  return requestJson.results;
};

export default getMusics;
