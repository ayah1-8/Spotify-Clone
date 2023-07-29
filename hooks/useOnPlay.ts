import { Song } from '@/types';

import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';

//reusable hook to be used in multiple places, to play songs in either liked songs, general song list or personal user song list
const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    //the songs come from whichever compoent the hook is used in.
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
