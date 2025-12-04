import type { Album } from './artist';
import type { TrackSearchResult } from './track';

export type SearchMode = 'tracks' | 'albums';

export interface TrackSearchResponse {
  results: {
    trackmatches: {
      track: TrackSearchResult[];
    };
    '@attr': {
      for: string;
    };
  };
}

export interface AlbumSearchResponse {
  results: {
    albummatches: {
      album: Album[];
    };
    '@attr': {
      for: string;
    };
  };
}

export type SearchResults = TrackSearchResult[] | Album[];

