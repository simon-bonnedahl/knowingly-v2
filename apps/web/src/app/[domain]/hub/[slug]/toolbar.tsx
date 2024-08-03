"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Avatar, AvatarImage } from "@knowingly/ui/avatar";

import { IconPicker } from "~/components/icon-picker";
import { isFile, isUrl } from "@knowingly/utils";
import { Ent } from "@knowingly/backend/convex/types";

interface ToolbarProps {
  page: Ent<"pages">;
  preview?: boolean;
  children?: React.ReactNode;
}

export const PageToolbar = ({
  page,
  preview,
  children,
}: ToolbarProps) => {
  const [name, setName] = useState(page.name);
  const [logo, setLogo] = useState(page.icon);

  const updatePage = useMutation(api.pages.update);


  const onIconSelect = (icon: string) => {
    setLogo(icon);
    void updatePage({
      slug: page.slug,
      field: "icon",
      value: icon,
    });
  };


  useEffect(() => {
    void updatePage({
      slug: page.slug,
      field: "name",
      value: name,
    });
  }, [name]);

  return (
    <div className=" group relative w-full py-4">
      {!!logo && !preview && (
        <div className="group/icon absolute -top-10   items-center gap-x-2 rounded-xl hover:bg-white/10 ">
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
      <div className="flex w-full items-end justify-between mt-4">
        <input
          type="text"
          disabled={preview}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          className="mt-4 w-full bg-transparent text-4xl  font-bold focus:outline-none text-foreground"
        />
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
};
