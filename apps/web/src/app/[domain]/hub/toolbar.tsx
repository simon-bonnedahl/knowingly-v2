"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Ent, Icon as IconType } from "@knowingly/backend/convex/types";
import { Input } from "@knowingly/ui/input";

import { IconPicker } from "~/components/icon-picker";
import { RenderIcon } from "~/components/icon-picker/render-icon";
import { useEdit } from "~/lib/hooks/useEdit";
import { useSubdomain } from "~/lib/hooks/useSubdomain";

interface HubToolbarProps {
  hub: Ent<"hubs">;
  children?: React.ReactNode;
}

export const HubToolbar = ({ hub, children }: HubToolbarProps) => {
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
        error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
      },
    );
  };

  const onSaveName = () => {
    if (!name || name === hub.name) return;
    toast.promise(
      updateHub({
        subdomain,
        field: "name",
        value: name,
      }),
      {
        loading: "Updating name",
        success: "Success: Updated name",
        error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
      },
    );
  };

  const onSaveDescription = () => {
    if (!description || description === hub.description) return;
    toast.promise(
      updateHub({
        subdomain,
        field: "description",
        value: description,
      }),
      {
        loading: "Updating description",
        success: "Success: Updated description",
        error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
      },
    );
  };

  return (
    <div className=" group relative" id="hub-toolbar">
        {edit ? (
          <div className="absolute -top-12" id="hub-icon">
            <IconPicker onChange={onIconSelect}>
              <RenderIcon icon={icon} size={6} />
            </IconPicker>
          </div>
        ) : (
          <RenderIcon icon={icon} size={6} className="absolute -top-12" id="hub-icon"/>
        )}
      <div className="pt-14 w-full ">
        <div className="flex w-full items-center justify-between">
          <Input
            id="hub-name"
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
