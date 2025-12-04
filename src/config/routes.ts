export const routes = {
  home: '/',
  albumDetail: (artistName: string, albumName: string) =>
    `/album/${encodeURIComponent(artistName)}/${encodeURIComponent(albumName)}`,
  search: '/search',
  favourites: '/favourites',
} as const;

export const routePaths = {
  home: '/',
  albumDetail: '/album/:artistName/:albumName',
  search: '/search',
  favourites: '/favourites',
} as const;

