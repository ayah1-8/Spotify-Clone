'use client';

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer';
import React from 'react';
import PlayerContent from './PlayerContent';

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!); //chance it could be undefined so we add !

  //protection so if we dont have any of the song/url or active id to not show the player section
  if (!song || !songUrl || !player.activeId) {
    return null;
  }
  return (
    <div
      className="fixed
    bottom-0
    bg-black
    w-full
    py-2
    h-[80px]
    px-4"
    >
      <PlayerContent
        key={songUrl} //resets entire hook, destoyselemnt and rebuilds it
        song={song}
        songUrl={songUrl}
      />
    </div>
  );
};

export default Player;
