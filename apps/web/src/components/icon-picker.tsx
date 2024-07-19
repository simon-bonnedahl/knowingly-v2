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
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="w-[354px] border-none p-0 shadow-none ">
        <Tabs>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="emoji">Emoji</TabsTrigger>
            <TabsTrigger value="logo">Logo</TabsTrigger>
          </TabsList>
          <TabsContent value="emoji">
            <Picker
              className="w-full"
              data={data}
              onEmojiSelect={(emoji) => onChange(emoji.native)}
              theme={theme}
            />
          </TabsContent>
          <TabsContent value="logo">
            <div className="flex h-fit w-full flex-col gap-2 rounded-xl border border-muted py-4 shadow-sm">
              <div className="px-4">
                <FileUploader />
              </div>

              <Separator horizontal decorative />

              {uploads ? (
                <div className="grid w-full grid-cols-4 px-4 gap-1">
                  {uploads.map((upload) => (
                    <Button variant={"ringHover"} className="w-fit h-fit p-0" onClick={() => onChange(upload as string)}>
                    <Image src={upload ?? ""} alt={upload ?? ""}  width={100} height={100} className="w-full rounded-md object-cover aspect-square" />
                    </Button>
                  ))}
                </div>
              ) : (
                <LoadingDots />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
