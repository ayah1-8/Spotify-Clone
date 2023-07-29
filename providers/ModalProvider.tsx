'use client';

import { useEffect, useState } from 'react';

import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';

const ModalProvider = () => {
  //a way around avoiding hydration and whatevvaaa //
  //none of the modals can be seen or rendered during server side renderning
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <UploadModal />
      <AuthModal />
    </>
  );
};

export default ModalProvider;
