import { Song } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from('liked_songs')
    .select('*,songs(*)') //because of the relationship
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({ ...item.songs })); ///spreading the relation we poulated with the one song we will be loading in each of this field
};

export default getLikedSongs;
