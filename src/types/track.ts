import type { AlbumImage } from './artist';

export interface TrackSearchResult {
  name: string;
  artist: string;
  url?: string;
  listeners?: number;
  mbid?: string;
  image?: AlbumImage[];
}

export interface FavouriteTrack {
  id: string;
  name: string;
  artist: string;
  album?: string;
  duration?: number;
  playcount?: number;
  url?: string;
}

