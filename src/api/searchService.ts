import { lastFmGet } from './client';
import type { Album } from '../types/artist';
import type { TrackSearchResult } from '../types/track';
import type { TrackSearchResponse, AlbumSearchResponse } from '../types/search';

export async function searchTracks(query: string): Promise<TrackSearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const response = await lastFmGet<TrackSearchResponse>({
    method: 'track.search',
    track: query,
    limit: 30,
  });

  return response.results.trackmatches.track.map((track) => ({
    name: track.name,
    artist: track.artist,
    url: track.url,
    listeners: track.listeners,
    mbid: track.mbid,
    image: track.image,
  }));
}

export async function searchAlbums(query: string): Promise<Album[]> {
  if (!query.trim()) {
    return [];
  }

  const response = await lastFmGet<AlbumSearchResponse>({
    method: 'album.search',
    album: query,
    limit: 30,
  });

  return response.results.albummatches.album.map((album) => ({
    name: album.name,
    artist: album.artist,
    mbid: album.mbid,
    url: album.url,
    image: album.image,
    playcount: album.playcount,
    listeners: album.listeners,
  }));
}

