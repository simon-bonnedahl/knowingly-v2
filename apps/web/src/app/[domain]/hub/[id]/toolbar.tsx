"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Ent, Icon as IconType } from "@knowingly/backend/convex/types";
import { Icon } from "@knowingly/icons";
import { Input } from "@knowingly/ui/input";

import { IconPicker } from "~/components/icon-picker";
import { RenderIcon } from "~/components/icon-picker/render-icon";
import { useEdit } from "~/lib/hooks/useEdit";

interface PageToolbarProps {
  page: Ent<"pages">;
  children?: React.ReactNode;
}

export const PageToolbar = ({ page, children }: PageToolbarProps) => {
  const { edit } = useEdit();
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
      },
    );
  };

  const onSaveName = () => {
    if (!name || name === page.name) return;
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
    <div className=" group relative">
      {edit ? (
        <div className="absolute -top-12">
          <IconPicker onChange={onIconSelect}>
            <RenderIcon icon={icon} size={6} />
          </IconPicker>
        </div>
      ) : (
        <RenderIcon icon={icon} size={6} className="absolute -top-12" />
      )}
      
      <div className="pt-14 w-full ">
        <div className="flex w-full items-center justify-between">
          <Input
            minimal
            placeholder="Hub name..."
            disabled={!edit}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            onBlur={onSaveName}
            className="w-full bg-transparent text-4xl font-bold" 
          />
          <div className="flex items-center gap-2">{children}</div>
        </div>

        {/* <Button onClick={handleStartOnborda}>
          start
        </Button> */}
      </div>
      

    </div>
  );
};
