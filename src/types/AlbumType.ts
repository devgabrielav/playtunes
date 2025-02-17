export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export const initialValue = {
  artistId: 0,
  artistName: '',
  collectionId: 0,
  collectionName: '',
  collectionPrice: 0,
  artworkUrl100: 'null',
  releaseDate: '',
  trackCount: 0
};