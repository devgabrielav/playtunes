import { AlbumType, SongType } from '../types';

const getMusics = async (id: string): Promise<[AlbumType, ...SongType[]]> => {
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = `https://itunes.apple.com/lookup?id=${id}&entity=song`;

  try {
    const request = await fetch(corsProxyUrl + apiUrl);
    const requestJson = await request.json();
    return requestJson.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default getMusics;
