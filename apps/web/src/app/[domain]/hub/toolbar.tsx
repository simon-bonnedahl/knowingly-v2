"use client";

import React, { useEffect, useState } from "react";
import { IconImageInPicture, IconMoodSmile } from "@tabler/icons-react";
import { useMutation } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Doc } from "@knowingly/backend/convex/_generated/dataModel";
import { Avatar , AvatarImage } from "@knowingly/ui/avatar";
import { Button } from "@knowingly/ui/button";

import { useBanner } from "~/lib/hooks/useBanner";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { IconPicker } from "../../../components/icon-picker";
import { isFile, isUrl } from "@knowingly/utils";

interface ToolbarProps {
  initialData: Doc<"hubs">;
  preview?: boolean;
}

export const HubToolbar = ({ initialData, preview }: ToolbarProps) => {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [logo , setLogo] = useState(initialData.logo)
  const subdomain = useSubdomain();

  const updateHub = useMutation(api.hubs.update);

  const banner = useBanner();

  const onIconSelect = (icon: string) => {
    setLogo(icon);
    void updateHub({
      subdomain,
      field: "logo",
      value: icon,
    });
  };



  useEffect(() => {
    void updateHub({
      subdomain,
      field: "name",
      value: name,
    });
  }, [name]);

  useEffect(() => {
    void updateHub({
      subdomain,
      field: "description",
      value: description,
    });
  }, [description]);

  return (
    <div className=" group relative w-3/4">
      <div className="group/icon absolute -top-8  left-4 items-center gap-x-2 rounded-xl hover:bg-white/10 ">

        {!!logo && !preview && (
          <IconPicker onChange={onIconSelect}>
            <Avatar className="transition hover:opacity-75 w-full h-full">
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
        )}

      </div>
      {!!logo && preview && (
        <div className="absolute -top-14 left-4 pt-6 text-7xl">
          <Avatar className="transition hover:opacity-75 w-full h-full">
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
              className="text-xs text-muted-foreground"
              variant="outline"
              size="sm"
            >
              <IconMoodSmile className="mr-2 h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.banner && !preview && (
          <Button
            onClick={banner.onOpen}
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
          >
            <IconImageInPicture className="mr-2 h-4 w-4" />
            Add cover
          </Button>
        )}
      </div>
      <input
        type="text"
        placeholder="Hub name..."
        disabled={preview}
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        className="mt-4 w-full bg-transparent text-4xl  font-bold text-black focus:outline-none dark:text-white"
      />
      <input
        type="text"
        placeholder="Description..."
        disabled={preview}
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        className="text-md  w-full bg-transparent  font-bold text-black focus:outline-none dark:text-white"
      />
    </div>
  );
};
