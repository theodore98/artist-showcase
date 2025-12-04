export interface Artist {
  name: string;
  mbid?: string;
  url?: string;
}

export interface Album {
  name: string;
  artist: string | {
    name: string;
    mbid?: string;
    url?: string;
  };
  mbid?: string;
  url?: string;
  image: AlbumImage[];
  playcount?: number;
  listeners?: number;
}

export interface AlbumImage {
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | '';
  '#text': string;
}

export interface TopAlbumsResponse {
  topalbums: {
    album: Album[];
    '@attr': {
      artist: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

