import type { AlbumImage } from './artist';

export interface Track {
  name: string;
  duration: number;
  playcount?: number;
  listeners?: number;
  url?: string;
  artist?: {
    name: string;
    mbid?: string;
    url?: string;
  };
  '@attr'?: {
    rank: number;
  };
}

export interface AlbumDetail {
  name: string;
  artist: string | {
    name: string;
    mbid?: string;
    url?: string;
  };
  mbid?: string;
  url?: string;
  image: AlbumImage[];
  listeners?: number;
  playcount?: number;
  tracks?: {
    track: Track[];
  };
  tags?: {
    tag: Array<{
      name: string;
      url: string;
    }>;
  };
  wiki?: {
    published: string;
    summary: string;
    content: string;
  };
}

export interface AlbumInfoResponse {
  album: AlbumDetail;
}

