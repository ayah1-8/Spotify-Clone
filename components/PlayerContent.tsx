'use client';

import useSound from 'use-sound';
import { useEffect, useState } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';

import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';

import LikeButton from './LikeButton';
import MediaItem from './MediaItem';
import Slider from './Slider';

interface PalyerContentProps {
  song: Song;
  songUrl: string;
}

//controls the display of the currently playing song
const PlayerContent: React.FC<PalyerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    //if player is empty
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    //if we'e at the end of the player list, we move on to the first song of the player list
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    //if we'e at the start of the player list, we move on to the last song of the player list
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  });

  //useEffect that automaticlly play the song when the player component loads
  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else pause();
  };

  const toggleMute = () => {
    if (volume === 0) setVolume(1);
    else setVolume(0);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      {/*Song Media Item + Like Button */}
      {/*Desktop View */}
      <div className="flex w-full justify-start ">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/*Pause & unPaiuse Icon */}
      {/* Phone view */}
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      {/*  Before     &    Play      &     Forward  */}
      {/* ONLY Desktopn view */}
      <div
        className="
        hidden
        h-full
        md:flex
        justify-center
        items-center
        w-full
        max-w-[720px]
        gap-x-6
      "
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />

        <div
          onClick={handlePlay}
          className="flex h-10 w-10 rounded-full justify-center items-center p-1 bg-white cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>

        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      {/*               VOLUME           */}
      {/*         ONLY Desktop view      */}
      <div
        className="
        hidden
        md:flex
        w-full
        justify-end pr-2
        "
      >
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
