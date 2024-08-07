"use client";

import React, {  useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";

import { IconPicker } from "~/components/icon-picker";
import { Ent, Icon as IconType } from "@knowingly/backend/convex/types";
import { toast } from "sonner";
import { Icon } from "@knowingly/icons";
import { useEdit } from "~/lib/hooks/useEdit";
import Image from "next/image";
import { Input } from "@knowingly/ui/input";

interface ToolbarProps {
  page: Ent<"pages">;
  children?: React.ReactNode;
}

export const PageToolbar = ({
  page,
  children,
}: ToolbarProps) => {
  const { edit} = useEdit();
  const [name, setName] = useState(page.name);
  const [icon, setIcon] = useState(page.icon);

  const updatePage = useMutation(api.pages.update);


  const onIconSelect = (icon: IconType) => {
    setIcon(icon);

    toast.promise(
      updatePage({
        id: page._id,
        field: "icon",
        value: icon,
      }),
      {
        loading: "Updating icon",
        success: "Success: Updated icon",
        error: (error) => `Error: ${error.data}`,
      }
    );

  };


  const onSaveName = () => {
    if (!name || name === page.name) return
    toast.promise(
      updatePage({
        id: page._id,
        field: "name",
        value: name,
      }),
      {
        loading: "Updating name",
        success: "Success: Updated name",
        error: (error) => `Error: ${error.data}`,
      },
    );
  };

  return (
    <div className=" group relative w-full py-4">
       {edit ? (
          <div className="absolute -top-14 size-fit">
            <IconPicker onChange={onIconSelect}>
              <div className="size-[6rem]">
                {icon.type === "URL" && (
                  <Image
                    src={icon.value}
                    width={400}
                    height={400}
                    alt="logo"
                    className="size-full rounded-full object-cover"
                  />
                )}
                {icon.type === "EMOJI" && (
                  <span className="text-[6rem] leading-[6rem] select-none">
                    {icon.value}
                  </span>
                )}
                {icon.type === "ICON" && (
                  <Icon name={icon.value} className="size-full" />
                )}
              </div>
            </IconPicker>
          </div>
        ) : (
            <div className="absolute -top-14  size-[6rem] ">
                {icon.type === "URL" && (
                  <Image
                    src={icon.value}
                    width={400}
                    height={400}
                    alt="logo"
                    className="size-full rounded-full object-cover"
                  />
                )}
                {icon.type === "EMOJI" && (
                  <span className="text-[6rem] leading-[6rem] select-none">
                    {icon.value}
                  </span>
                )}
                {icon.type === "ICON" && (
                  <Icon name={icon.value} className="size-full" />
                )}
              </div>
        )}
   
      <div className="flex w-full items-end justify-between mt-4">
        <Input
          minimal
          disabled={!edit}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          onBlur={onSaveName}
          className="mt-4 w-full bg-transparent text-4xl  font-bold focus:outline-none text-foreground"
        />
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
};
