"use client"

import React from "react"
import type {SyntheticEvent} from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop
} from "react-image-crop"
import type {Crop, PixelCrop} from "react-image-crop";



import "react-image-crop/dist/ReactCrop.css"
import { Button } from "@knowingly/ui/button"
import { Icons } from "@knowingly/icons";
import Image from "next/image";

interface FileWithPreview extends File {
  preview: string
}

interface ImageCropperProps {
  selectedFile: FileWithPreview
  setSelectedFile: (file: File) => void
  aspect?: number | undefined
}

export function ImageCropper({
  selectedFile,
  setSelectedFile,
  aspect = undefined,
}: ImageCropperProps) {

  const imgRef = React.useRef<HTMLImageElement | null>(null)

  const [crop, setCrop] = React.useState<Crop>()
  const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>("")

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  function onCropComplete(crop: PixelCrop) {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop)
      setCroppedImageUrl(croppedImageUrl)
    }
  }
  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',');

    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
    const canvas = document.createElement("canvas")
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = crop.width * scaleX
    canvas.height = crop.height * scaleY

    const ctx = canvas.getContext("2d")

    if (ctx) {
      ctx.imageSmoothingEnabled = false

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      )
    }

    return canvas.toDataURL("image/png", 1.0)
  }

   function onCrop() {
      const file = dataURLtoFile(croppedImageUrl, selectedFile?.name ?? "cropped-image")
      console.log(file)
      setSelectedFile(file)
    }

  return (
    <div className="">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => onCropComplete(c)}
            aspect={aspect}
            className="w-full"
          >
              <Image
                width={400}
                height={400}
                ref={imgRef}
                className="size-full rounded-none  "
                alt="Image Cropper Shell"
                src={selectedFile?.preview}
                onLoad={onImageLoad}
              />
          </ReactCrop>
        <div className=" flex w-full justify-between ">
            <Button
              size={"sm"}
              type="reset"
              className="w-fit"
              variant={"outline"}
              onClick={() => {
                setSelectedFile(null)
              }}
            >
              <Icons.trash className="mr-1.5 size-4" />
              Cancel
            </Button>
          <Button type="submit" size={"sm"} className="w-fit" onClick={onCrop}>
            <Icons.crop className="mr-1.5 size-4" />
            Crop
          </Button>
        </div>
    </div>
  )
}

// Helper function to center the crop
export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 50,
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}