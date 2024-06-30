import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2  px-2 py-1 text-sm  font-normal text-black"
    >
      <Image
        src="/logo-black.svg"
        alt="Knowingly"
        width={100}
        height={50}
        className="dark:hidden"
      />
      <Image
        src="/logo-white.svg"
        alt="Knowingly"
        width={100}
        height={50}
        className="hidden dark:flex"
      />
      {/* <span className="font-medium text-black dark:text-white">Knowingly</span> */}
    </Link>
  );
};
