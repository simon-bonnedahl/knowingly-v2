"use client";

import { useEffect, useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { render } from "@react-three/fiber";
import { useMutation } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Button } from "@knowingly/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@knowingly/ui/dropdown-menu";
import { Input } from "@knowingly/ui/input";

import { usePreview } from "~/lib/hooks/usePreview";
import { Icon, IconKey, Icons } from "../icons";
import { IconPicker } from "./icon-picker";
import { CustomFieldTypeKey, CustomFieldTypes } from "./types";

interface EditFieldProps {
  field: {
    value: any;
    _id: Id<"customFields">;
    _creationTime: number;
    icon?: string | undefined;
    options?:
      | {
          suggestions?: string[] | undefined;
          format?: string | undefined;
        }
      | undefined;
    name: string;
    type: string;
    isLocked: boolean;
    isSuggested: boolean;
    slug: string;
  };
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
    updateField({
      slug: field.slug,
      field: "icon",
      value: icon,
    });
  }, [icon]);

  useEffect(() => {
    if (name === field.name) return;
    updateField({
      slug: field.slug,
      field: "name",
      value: name,
    });
  }, [name]);

  useEffect(() => {
    if (options === field.options) return;
    updateField({
      slug: field.slug,
      field: "options",
      value: options,
    });
  }, [options]);

  if (preview)
    return (
      <div className="flex w-48 items-center justify-start gap-1 truncate whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground ">
        <Icon name={icon} className="h-5 w-5 " />
        <span className=" max-w-28  truncate">{field.name}</span>
      </div>
    );

  const RenderSettings =
    CustomFieldTypes[field.type as CustomFieldTypeKey].renderSettings;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-48 items-center justify-start gap-1 truncate text-muted-foreground hover:text-muted-foreground  focus-visible:ring-0"
          disabled={preview}
        >
          <Icon name={icon} className="h-5 w-5 " />
          <span className=" max-w-28  truncate">{field.name}</span>
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
                  onClick={() => {
                    updateField({
                      slug: field.slug,
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
