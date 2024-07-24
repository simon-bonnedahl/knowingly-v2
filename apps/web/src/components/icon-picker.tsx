"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  UploadButton,
  UploadDropzone,
  UploadFileResponse,
} from "@xixixao/uploadstuff/react";
import { useMutation, useQuery } from "convex/react";
import { useTheme } from "next-themes";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Button } from "@knowingly/ui/button";
import { Card } from "@knowingly/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@knowingly/ui/popover";
import { Separator } from "@knowingly/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@knowingly/ui/tabs";

import { FileUploader } from "./file-uploader";
import { LoadingDots } from "./loaders";
import Image from "next/image";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

export const IconPicker = ({
  onChange,
  children,
  asChild,
}: IconPickerProps) => {
  const { theme } = useTheme();
  const uploads = useQuery(api.users.getUploads);
  return (
    <Popover >
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="w-fit max-w-[370px] p-2 border  shadow-none z-50 ">
        <Tabs>
          <div className="flex w-full">

          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="emoji">Emoji</TabsTrigger>
            <TabsTrigger value="logo">Logo</TabsTrigger>
          </TabsList>
          <Button variant="text" onClick={() => onChange("")}>Clear</Button>
          </div>

          <TabsContent value="emoji">
            <Picker
              data={data}
              onEmojiSelect={(emoji) => onChange(emoji.native)}
              theme={theme}
            />
          </TabsContent>
          <TabsContent value="logo" className="flex flex-col gap-2">
                <FileUploader />

              <Separator horizontal decorative />

              {uploads ? (
                <div className="grid w-full grid-cols-6 gap-1">
                  {uploads.map((upload) => (
                    <Button variant={"ringHover"} className="w-fit h-fit p-0" onClick={() => onChange(upload as string)} key={upload}>
                    <Image src={upload ?? ""} alt={upload ?? ""}  width={100} height={100} className="w-full rounded-md object-cover aspect-square" />
                    </Button>
                  ))}
                </div>
              ) : (
                <LoadingDots />
              )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
