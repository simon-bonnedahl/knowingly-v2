"use client";

import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import type { Ent, FieldValue } from "@knowingly/backend/convex/types";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Icon, Icons } from "@knowingly/icons";
import { Button, buttonVariants } from "@knowingly/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@knowingly/ui/dropdown-menu";
import { Input } from "@knowingly/ui/input";

import { useEdit } from "~/lib/hooks/useEdit";
import { IconPicker } from "../icon-picker";
import { RenderIcon } from "../icon-picker/render-icon";
import { Fields } from "./types";
import { cn } from "@knowingly/ui";

interface EditFieldProps {
  field: Ent<"fields">;
  onEditValue: (id: Id<"fields">, value: FieldValue) => void;
  onDeleteField: (id: Id<"fields">) => void;
}

export function FieldSettings({
  field,
  onEditValue,
  onDeleteField,
}: EditFieldProps) {
  const { edit } = useEdit();
  const [name, setName] = useState(field.name);
  const [icon, setIcon] = useState(field.icon);
  const [options, setOptions] = useState(field.options);

  const updateField = useMutation(api.fields.update);

  useEffect(() => {
    if (!icon || icon === field.icon) return;
    toast.promise(
      updateField({
        id: field._id,
        field: "icon",
        value: icon,
      }),
      {
        loading: "Updating icon",
        success: "Success: Updated icon",
        error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
      },
    );
  }, [icon]);

  const onSaveName = () => {
    if (!name || name === field.name) return
    toast.promise(
      updateField({
        id: field._id,
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

  useEffect(() => {
    if (!options || options === field.options) return;

    toast.promise(
      updateField({
        id: field._id,
        field: "options",
        value: options,
      }),
      {
        loading: "Updating options",
        success: "Success: Updated options",
        error: (error) => `Error: ${error.data ?? "Something went wrong"}`,
      },
    );
  }, [options]);

  if (!edit)
    return (
      <div className="flex w-64 items-center justify-start gap-1 truncate whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground ">
        <RenderIcon icon={icon} size={1.25} />
        <span className=" max-w-32 truncate">{field.name}</span>
      </div>
    );

  const RenderSettings = Fields[field.type].renderSettings;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "flex w-64 items-center justify-start gap-1 truncate text-muted-foreground hover:text-muted-foreground  focus-visible:ring-0 hover:cursor-pointer")}
        >
          <RenderIcon icon={icon} size={1.25} />
          <span className=" max-w-32  truncate">{field.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex gap-1">
          <IconPicker onChange={setIcon}>
            <Button variant="outline" className="h-9 w-9 px-2">
              <RenderIcon icon={icon} size={1.25} />
            </Button>
          </IconPicker>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={onSaveName}
          />
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className="flex w-full  justify-between ">
              <span>Type</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Icon
                  name={Fields[field.type].icon.value}
                  className="h-4 w-4"
                />

                {Fields[field.type].name}
              </div>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {Object.entries(Fields).map(([key, f]) => (
                <DropdownMenuItem
                  key={key}
                  className="flex justify-between hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    void updateField({
                      id: field._id,
                      field: "type",
                      value: key,
                    });
                    onEditValue(field._id, f.defaultValue);
                    // setIcon(f.icon); //TODO: do this or no?
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Icon name={f.icon.value} className="h-4 w-4" />
                    {f.name}
                  </div>
                  {field.type === key && <Icons.check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <RenderSettings options={options} setOptions={setOptions} />
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex justify-between hover:cursor-pointer"
          onClick={() => onDeleteField(field._id)}
        >
          Delete
          <Icons.trash className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
