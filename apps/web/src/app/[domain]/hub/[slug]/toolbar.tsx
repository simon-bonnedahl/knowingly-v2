"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import type { Doc } from "@knowingly/backend/convex/_generated/dataModel";
import { Avatar, AvatarImage } from "@knowingly/ui/avatar";
import { Button } from "@knowingly/ui/button";

import { IconPicker } from "~/components/icon-picker";
import { useBanner } from "~/lib/hooks/useBanner";
import { isFile, isUrl } from "@knowingly/utils";
import { Icons } from "@knowingly/icons";

interface ToolbarProps {
  initialData: Doc<"pages">;
  preview?: boolean;
  children?: React.ReactNode;
}

export const PageToolbar = ({
  initialData,
  preview,
  children,
}: ToolbarProps) => {
  const [name, setName] = useState(initialData.name);
  const [logo, setLogo] = useState(initialData.icon);

  const updatePage = useMutation(api.pages.update);

  const banner = useBanner();

  const onIconSelect = (icon: string) => {
    setLogo(icon);
    void updatePage({
      slug: initialData.slug,
      field: "icon",
      value: icon,
    });
  };

  const onRemoveIcon = () => {
    void updatePage({
      slug: initialData.slug,
      field: "icon",
      value: "",
    });
  };

  useEffect(() => {
    void updatePage({
      slug: initialData.slug,
      field: "name",
      value: name,
    });
  }, [name]);

  return (
    <div className=" group relative w-full px-24 py-4">
      {!!logo && !preview && (
        <div className="group/icon absolute -top-8  left-24 items-center gap-x-2 rounded-xl hover:bg-white/10 ">
          <IconPicker onChange={onIconSelect}>
          <Avatar className="h-full w-full rounded-sm transition hover:opacity-75">
            {(isUrl(logo) || isFile(logo)) ? (
                <AvatarImage
                  src={logo}
                  className="size-[4.5rem] rounded-full object-cover"
                />
            ) : (
              <div className="bg-transparent">
                <p className="text-7xl ">{logo}</p>
              </div>
            )}
          </Avatar>
          </IconPicker>
        </div>
      )}
      {!!logo && preview && (
        <div className="absolute -top-14 left-24 pt-6 text-7xl">
          <Avatar className="h-full w-full rounded-sm transition hover:opacity-75">
            {(isUrl(logo) || isFile(logo)) ? (
                <AvatarImage
                  src={logo}
                  className="size-[4.5rem] rounded-full object-cover"
                />
            ) : (
              <div className="bg-transparent">
                <p className="text-7xl ">{logo}</p>
              </div>
            )}
          </Avatar>
        </div>
      )}
      <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
        {!logo && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              onClick={banner.onOpen}
              className="absolute left-0 top-0 flex items-center gap-x-1 text-xs text-muted-foreground"
              variant="outline"
            >
              <Icons.moodSmile className="mr-2 h-4 w-4" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.image && !preview && (
          <Button
            onClick={banner.onOpen}
            className="absolute left-32 top-0 flex items-center gap-x-1 text-xs text-muted-foreground"
            variant="outline"
          >
            <Icons.photoPlus className="mr-2 h-4 w-4" />
            Add banner
          </Button>
        )}
      </div>
      <div className="flex w-full items-end justify-between ">
        <input
          type="text"
          disabled={preview}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          className="mt-4 w-full bg-transparent text-4xl  font-bold text-black focus:outline-none dark:text-white"
        />
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
};
