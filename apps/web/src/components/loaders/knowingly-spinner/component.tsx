"use client";

import LottieLoader from "react-lottie-loader";

import animationDataDark from "./lottie-data-white.json";
import animationData from "./lottie-data.json";
import { useEffect, useState } from "react";

export const KnowinglySpinner = () => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <LottieLoader
        animationData={animationData}
        className="h-36 w-36"
      />
      {/* <LottieLoader
        animationData={animationDataDark}
        className="hidden h-36 w-36 dark:block"
      /> */}
    </>
  );
};
