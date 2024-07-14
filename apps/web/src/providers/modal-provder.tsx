"use client";

import { useEffect, useState } from "react";

// import { UploadBannerModal } from "@knowingly/modals/upload-banner";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      {/* <UploadBannerModal /> */}
    </>
  );
};
