"use client";

import { cn } from "@knowingly/ui";
import {  useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function ImageUpload({
  image,
  setImage,
  name,
  className,
}: {
  image: string | null;
  setImage?: any;
  name: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  const handleUpload = (file: File | undefined | null) => {
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        toast.error("File size too big (max 50MB)");
      } else if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg") &&
        !file.type.includes("webp")
      ) {
        toast.error("Invalid file type (must be .png, .jpg, or .jpeg)");
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div>
      <label
        htmlFor={`${name}-upload`}
        className={cn(
          "focus-within:ring-primary-500 focus-within:ring-opacity group relative   mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-background shadow-sm transition-all focus-within:ring-2 focus-within:ring-offset-2 hover:opacity-80",
          className,
        )}
      >
        <div
          className="absolute z-[5] h-full w-full rounded-md"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file =  e.dataTransfer.files[0];
            inputRef.current!.files = e.dataTransfer.files; // set input file to dropped file
            handleUpload(file);
          }}
        />
        <div
          className={`${
            dragActive ? "border-2 border-black" : ""
          } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
            image
              ? "bg-background/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
              : "bg-background opacity-100 hover:bg-background/50 hover:backdrop-blur-md"
          }`}
        >
          <svg
            className={`${
              dragActive ? "scale-110" : "scale-100"
            } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M12 12v9"></path>
            <path d="m16 16-4-4-4 4"></path>
          </svg>
          <p className="mt-2 text-center text-sm text-gray-500">
            Drag and drop or click to upload.
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Max file size: 50MB
          </p>
          <span className="sr-only">Photo upload</span>
        </div>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
          width={500}
          height={500}
          src={image}
          alt="banner"
          className=" w-full max-w-2xl rounded-md object-cover"
        />
        )}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          id={`${name}-upload`}
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            handleUpload(file);
          }}
        />
      </div>
    </div>
  );
}
