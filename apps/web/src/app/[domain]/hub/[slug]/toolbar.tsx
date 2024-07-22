"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Doc } from "@knowingly/backend/convex/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "@knowingly/ui/avatar";
import { Button, buttonVariants } from "@knowingly/ui/button";

import { IconPicker } from "~/components/icon-picker";
import { Icons } from "~/components/icons";
import { useBanner } from "~/lib/hooks/useBanner";
import { isUrl } from "~/lib/utils";
import { RequestMeeting } from "./request-meeting";
import { SendMessage } from "./send-message";

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
  const params = useParams();
  const subdomain = decodeURIComponent(params.domain as string).split(".")[0];

  const updatePage = useMutation(api.pages.update);

  const banner = useBanner();

  const onIconSelect = (icon: string) => {
    updatePage({
      slug: initialData.slug,
      field: "icon",
      value: icon,
    });
  };

  const onRemoveIcon = () => {
    updatePage({
      slug: initialData.slug,
      field: "icon",
      value: "",
    });
  };

  useEffect(() => {
    updatePage({
      slug: initialData.slug,
      field: "name",
      value: name,
    });
  }, [name]);

  return (
    <div className=" group relative w-full px-24 py-4">
      {!!initialData.icon && !preview && (
        <div className="group/icon absolute -top-8  left-24 items-center gap-x-2 rounded-xl hover:bg-white/10 ">
          <IconPicker onChange={onIconSelect}>
          <Avatar className="h-full w-full rounded-sm transition hover:opacity-75">
            {isUrl(initialData.icon) ? (
                <AvatarImage
                  src={initialData.icon}
                  className="size-[4.5rem] rounded-full object-cover"
                />
            ) : (
              <AvatarFallback className="bg-transparent">
                <p className="text-7xl ">{initialData.icon}</p>
              </AvatarFallback>
            )}
          </Avatar>
          </IconPicker>
        </div>
      )}
      {!!initialData.icon && preview && (
        <div className="absolute -top-14 left-24 pt-6 text-7xl">
          <Avatar className="h-full w-full rounded-sm transition hover:opacity-75">
            {isUrl(initialData.icon) ? (
                <AvatarImage
                  src={initialData.icon}
                  className="size-[4.5rem] rounded-full object-cover"
                />
            ) : (
              <AvatarFallback className="bg-transparent">
                <p className="text-7xl ">{initialData.icon}</p>
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      )}
      <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
        {!initialData.icon && !preview && (
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
