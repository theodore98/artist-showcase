import { lastFmGet } from './client';
import type { Album, TopAlbumsResponse } from '../types/artist';

export async function getTopAlbums(artistName: string): Promise<Album[]> {
  const response = await lastFmGet<TopAlbumsResponse>({
    method: 'artist.gettopalbums',
    artist: artistName,
    limit: 50,
  });

  return response.topalbums.album.map((album) => ({
    name: album.name,
    artist: album.artist,
    mbid: album.mbid,
    url: album.url,
    image: album.image,
    playcount: album.playcount,
    listeners: album.listeners,
  }));
}

