import { AlbumType, SongType } from '../types';

const getMusics = async (id: string): Promise<[AlbumType, ...SongType[]]> => {
  try {
    const url = `/api/itunes-proxy?id=${id}&entity=song`
    const request = await fetch(url);
    const requestJson = await request.json();
    return requestJson.results;
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error();
  }
};

export default getMusics;
