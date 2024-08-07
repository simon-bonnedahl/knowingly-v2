"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Ent, Icon as IconType } from "@knowingly/backend/convex/types";
import { Icon } from "@knowingly/icons";

import { IconPicker } from "~/components/icon-picker";
import { useEdit } from "~/lib/hooks/useEdit";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { toast } from "sonner";
import { Input } from "@knowingly/ui/input";

interface HubToolbarProps {
  hub: Ent<"hubs">;
}

export const HubToolbar = ({ hub }: HubToolbarProps) => {
  const subdomain = useSubdomain();
  const { edit } = useEdit();

  const [name, setName] = useState(hub.name);
  const [description, setDescription] = useState(hub.description);
  const [icon, setIcon] = useState(hub.icon);

  const updateHub = useMutation(api.hubs.update);

  // const { startOnborda } = useOnborda();
  // const handleStartOnborda = () => {
  //   startOnborda();
  // };

  const onIconSelect = (icon: IconType) => {
    setIcon(icon);
    toast.promise(
      updateHub({
        subdomain,
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
    if (!name || name === hub.name) return
    toast.promise(
      updateHub({
        subdomain,
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

  const onSaveDescription = () => {
    if (!description || description === hub.description) return
    toast.promise(
      updateHub({
        subdomain,
        field: "description",
        value: description,
      }),
      {
        loading: "Updating description",
        success: "Success: Updated description",
        error: (error) => `Error: ${error.data}`,
      },
    );
  };

  return (
    <div className=" group relative w-3/4">
      <div className="group/icon absolute -top-8  left-4 items-center gap-x-2 rounded-xl hover:bg-white/10 ">
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
      </div>
      <div className="mt-10">
        <Input
          minimal
          placeholder="Hub name..."
          disabled={!edit}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          onBlur={onSaveName}
          className="mt-4 w-full text-4xl font-bold bg-transparent"
        />
        <Input
          minimal
          placeholder={edit ? "Description..." : ""}
          disabled={!edit}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          onBlur={onSaveDescription}
          className="text-md  w-full bg-transparent  font-bold text-foreground"
        />
        {/* <Button onClick={handleStartOnborda}>
          start
        </Button> */}
      </div>
    </div>
  );
};
