"use client";

import { useEffect, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Button } from "@knowingly/ui/button";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@knowingly/ui/dropdown-menu";
import { Input } from "@knowingly/ui/input";

import { usePreview } from "~/lib/hooks/usePreview";
import { IconPicker } from "./icon-picker";
import type { CustomFieldTypeKey} from "./types";
import { CustomFieldTypes } from "./types";
import type { Ent } from "@knowingly/backend/convex/types";
import type { IconKey} from "@knowingly/icons";
import { Icon, Icons } from "@knowingly/icons";

interface EditFieldProps {
  field: Ent<"customFields">;
  onEditValue: (id: string, value: any) => void;
  onDeleteField: (id: string) => void;
}

export function FieldSettings({
  field,
  onEditValue,
  onDeleteField,
}: EditFieldProps) {
  const { preview } = usePreview();
  const [name, setName] = useState(field.name);
  const [icon, setIcon] = useState(field.icon as IconKey);
  const [options, setOptions] = useState(field.options);
  const [openTypeList, setOpenTypeList] = useState(false);

  const updateField = useMutation(api.customFields.update);

  useEffect(() => {
    if (icon === field.icon) return;
    void updateField({
      id: field._id,
      field: "icon",
      value: icon,
    });
  }, [icon]);

  useEffect(() => {
    if (name === field.name) return;
    void updateField({
      id: field._id,
      field: "name",
      value: name,
    });
  }, [name]);

  useEffect(() => {
    if (options === field.options) return;
    void updateField({
      id: field._id,
      field: "options",
      value: options,
    });
  }, [options]);

  if (preview)
    return (
      <div className="flex w-64 items-center justify-start gap-1 truncate whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground ">
        <Icon name={icon} className="h-5 w-5 " />
        <span className=" max-w-32 truncate">{field.name}</span>
      </div>
    );

  const RenderSettings =
    CustomFieldTypes[field.type as CustomFieldTypeKey].renderSettings;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"sm"}
          className="flex w-64 items-center justify-start gap-1 truncate text-muted-foreground hover:text-muted-foreground  focus-visible:ring-0"
          disabled={preview}
        >
          <Icon name={icon} className="h-5 w-5 " />
          <span className=" max-w-32  truncate">{field.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="flex gap-1">
          <IconPicker icon={icon} setIcon={setIcon} />
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <div className="flex w-full  justify-between ">
              <span>Type</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Icon
                  name={CustomFieldTypes[field.type as CustomFieldTypeKey].icon}
                  className="h-4 w-4"
                />

                {CustomFieldTypes[field.type as CustomFieldTypeKey].name}
              </div>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {Object.entries(CustomFieldTypes).map(([key, type]) => (
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
                    onEditValue(
                      field._id,
                      CustomFieldTypes[key as CustomFieldTypeKey].defaultValue,
                    );
                    setIcon(CustomFieldTypes[key as CustomFieldTypeKey].icon);
                    setOpenTypeList(false);
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Icon name={type.icon} className="h-4 w-4" />
                    {type.name}
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
