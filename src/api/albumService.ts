import { lastFmGet } from './client';
import type { AlbumDetail, AlbumInfoResponse } from '../types/album';

export async function getAlbumInfo(
  artistName: string,
  albumName: string
): Promise<AlbumDetail> {
  const response = await lastFmGet<AlbumInfoResponse>({
    method: 'album.getinfo',
    artist: artistName,
    album: albumName,
  });

  return {
    name: response.album.name,
    artist: response.album.artist,
    mbid: response.album.mbid,
    url: response.album.url,
    image: response.album.image,
    listeners: response.album.listeners,
    playcount: response.album.playcount,
    tracks: response.album.tracks,
    tags: response.album.tags,
    wiki: response.album.wiki,
  };
}

