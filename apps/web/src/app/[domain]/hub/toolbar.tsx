"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Avatar , AvatarImage } from "@knowingly/ui/avatar";
import { Button } from "@knowingly/ui/button";

import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { IconPicker } from "../../../components/icon-picker";
import { isFile, isUrl } from "@knowingly/utils";
import { useOnborda } from "~/components/onborda";
import { Ent } from "@knowingly/backend/convex/types";

interface ToolbarProps {
  initialData: Ent<"hubs">;
  preview?: boolean;
}

export const HubToolbar = ({ initialData, preview }: ToolbarProps) => {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [logo , setLogo] = useState(initialData.logo)
  const subdomain = useSubdomain();

  const { startOnborda } = useOnborda();
  const handleStartOnborda = () => {
    startOnborda();
  };

  const updateHub = useMutation(api.hubs.update);


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
      <div className="mt-8">
      <input
        type="text"
        placeholder="Hub name..."
        disabled={preview}
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        className="mt-4 w-full bg-transparent text-4xl  font-bold text-foreground focus:outline-none "
      />
      <input
        type="text"
        placeholder="Description..."
        disabled={preview}
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        className="text-md  w-full bg-transparent  font-bold text-foreground focus:outline-none "
      />
       {/* <Button onClick={handleStartOnborda}>
          start
        </Button> */}
      </div>

    </div>
  );
};
