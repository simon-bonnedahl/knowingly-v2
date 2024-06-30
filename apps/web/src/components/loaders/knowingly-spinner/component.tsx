"use client";

import LottieLoader from "react-lottie-loader";

import animationDataDark from "./lottie-data-white.json";
import animationData from "./lottie-data.json";

export const KnowinglySpinner = () => {
  return (
    <>
      <LottieLoader
        animationData={animationData}
        className="h-36 w-36 dark:hidden"
      />
      <LottieLoader
        animationData={animationDataDark}
        className="hidden h-36 w-36 dark:block"
      />
    </>
  );
};
