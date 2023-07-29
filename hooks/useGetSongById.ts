import { useSessionContext } from '@supabase/auth-helpers-react';
import React, { useEffect, useMemo, useState } from 'react';

import { Song } from '@/types';
import { toast } from 'react-hot-toast';

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState(<Song | undefined>undefined);
  //here we use sesioncontext for authentication. so only read on and modify is accessible to authenticated users
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};

export default useGetSongById;
