import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VStack, Button, HStack } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAlbum, clearSelectedAlbum } from '../store/albumSlice';
import { AlbumHeader } from '../components/albumDetail/AlbumHeader';
import { TrackList } from '../components/albumDetail/TrackList';
import { BestPlayedChart } from '../components/albumDetail/BestPlayedChart';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorState } from '../components/common/ErrorState';

export default function AlbumDetailPage() {
  const { artistName, albumName } = useParams<{ artistName: string; albumName: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAlbum, isLoading, error } = useAppSelector((state) => state.album);

  useEffect(() => {
    if (artistName && albumName) {
      dispatch(fetchAlbum({
        artistName: decodeURIComponent(artistName),
        albumName: decodeURIComponent(albumName),
      }));
    }

    return () => {
      dispatch(clearSelectedAlbum());
    };
  }, [dispatch, artistName, albumName]);

  const handleRetry = () => {
    if (artistName && albumName) {
      dispatch(fetchAlbum({
        artistName: decodeURIComponent(artistName),
        albumName: decodeURIComponent(albumName),
      }));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <LoadingState message="Loading album details..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  if (!selectedAlbum) {
    return <ErrorState message="Album not found" />;
  }

  const tracks = selectedAlbum.tracks?.track || [];
  const albumArtistName = typeof selectedAlbum.artist === 'string' ? selectedAlbum.artist : selectedAlbum.artist.name;

  return (
    <VStack spacing={8} align="stretch" w="100%">
      <HStack>
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          onClick={handleBack}
        >
          Back
        </Button>
      </HStack>

      <AlbumHeader album={selectedAlbum} />

      {tracks.length > 0 && (
        <>
          <TrackList
            tracks={tracks}
            albumName={selectedAlbum.name}
            artistName={albumArtistName}
          />
          <BestPlayedChart tracks={tracks} />
        </>
      )}
    </VStack>
  );
}

