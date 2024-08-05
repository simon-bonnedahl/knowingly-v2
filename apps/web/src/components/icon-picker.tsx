"use client";

import Image from "next/image";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useQuery } from "convex/react";
import { useTheme } from "next-themes";

import { api } from "@knowingly/backend/convex/_generated/api";
import type { Icon } from "@knowingly/backend/convex/types";
import { Button } from "@knowingly/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@knowingly/ui/popover";
import { Separator } from "@knowingly/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@knowingly/ui/tabs";

import { FileUploader } from "./file-uploader";
import { LoadingDots } from "./loaders";
import { Input } from "@knowingly/ui/input";
import {  useEffect, useState } from "react";
import { Icons } from "@knowingly/icons";

interface IconPickerProps {
  onChange: (icon: Icon) => void;
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

  const [search, setSearch] = useState("");
  const [filteredIcons, setFilteredIcons] = useState<typeof Icons>(Icons);

  useEffect(() => {
    const filtered = Object.fromEntries(
      Object.entries(Icons).filter(([key]) => key.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredIcons(filtered as typeof Icons);
  }, [search]);

  return (
    <Popover>
      <PopoverTrigger className=" site-fit hover:opacity-95" asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="z-50 w-fit max-w-[370px] border  p-2 shadow-none ">
        <Tabs>
          <div className="flex w-full items-center gap-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="emoji">Emoji</TabsTrigger>
              <TabsTrigger value="icon">Icon</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="emoji" className="z-50">
            <Picker
              data={data}
              onEmojiSelect={(emoji: { native: string; }) =>
                onChange({ type: "EMOJI", value: emoji.native })
              }
              theme={theme}
            />
          </TabsContent>
          <TabsContent value="icon"  className="z-50">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for an icon"
              className="mb-4"
            />
            <div className="flex max-h-[24rem]  flex-wrap overflow-y-auto">
              {Object.entries(filteredIcons).length === 0 && (
                <p className="text-sm font-medium text-muted-foreground">
                  No icons found
                </p>
              )}
              {Object.entries(filteredIcons).map(([key, Icon]) => (
                <button
                  className="flex transform items-center justify-center p-1.5  transition-all duration-200 hover:scale-110 "
                  key={key}
                  onClick={() => onChange({type: "ICON", value: key})}
                  title={key}
                >
                  <Icon className="size-5 " />
                </button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="custom" className="z-50">
            <div className="w-full  flex flex-col gap-2">

            <FileUploader recommendedAspect={1} />

            <Separator />

            {uploads ? (
              <div className="grid w-full grid-cols-6 gap-1">
                {uploads.map((upload) => (
                  <Button
                    variant={"ringHover"}
                    className="h-fit w-fit p-0"
                    onClick={() => onChange({ type: "URL", value: upload })}
                    key={upload}
                  >
                    <Image
                      src={upload ?? ""}
                      alt={upload ?? ""}
                      width={100}
                      height={100}
                      className="aspect-square w-full rounded-md object-cover"
                    />
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
