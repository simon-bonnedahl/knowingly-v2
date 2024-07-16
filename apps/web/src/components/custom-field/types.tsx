import { url } from "inspector";
import Link from "next/link";

import { Input } from "@knowingly/ui/input";
import { Label } from "@knowingly/ui/label";
import { Progress } from "@knowingly/ui/progress";
import { RadioGroup, RadioGroupItem } from "@knowingly/ui/radio-group";
import { Status } from "@knowingly/ui/status";
import { Tag, TagInput } from "@knowingly/ui/tag-input";

import { cn } from "~/lib/utils";
import { IconKey } from "../icons";
import { RingProgress } from "../ring-progress";
import { useState } from "react";
import { Badge } from "@knowingly/ui/badge";

export const CustomFieldTypes = {
  text: {
    name: "Text",
    icon: "alignLeft" as IconKey,
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => null,
    valueInput: ({
      value,
      setValue,
    }: {
      value: any;
      setValue: (value: any) => void;
    }) => (
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }: { value: any; options: any }) => (
      <div>{value}</div>
    ),
  },
  number: {
    name: "Number",
    icon: "hash" as IconKey,
    defaultValue: 0,
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => {
      const onValueChange = (value: any) => {
        setOptions((options) => ({ ...options, showAs: value }));
      };
      const number = 66;
      return (
        <div>
          <span className="text-sm text-muted-foreground">Show as</span>
          <div className="grid grid-cols-3 gap-1">
            <button
              className={cn(
                "relative flex h-12 w-full flex-col items-center rounded-md border pt-2 transition-all duration-150 ease-in-out",
                options?.showAs !== "bar" &&
                  options?.showAs !== "ring" &&
                  "border-2 border-primary",
              )}
              onClick={() => onValueChange("number")}
            >
              <span className="text-sm font-medium">{number}</span>
              <span className="absolute bottom-0 text-xs">Number</span>
            </button>
            <button
              className={cn(
                "relative flex h-12 w-full flex-col items-center rounded-md border pt-4 transition-all duration-150 ease-in-out",
                options?.showAs === "bar" && "border-2 border-primary",
              )}
              onClick={() => onValueChange("bar")}
            >
              <Progress value={number} max={100} className="h-1 w-8" />
              <span className="absolute bottom-0 text-xs">Bar</span>
            </button>
            <button
              className={cn(
                "relative flex h-12 w-full flex-col items-center rounded-md border transition-all duration-150 ease-in-out",
                options?.showAs === "ring" && "border-2 border-primary",
              )}
              onClick={() => onValueChange("ring")}
            >
              <RingProgress value={number} max={100} radius={8} />
              <span className="absolute bottom-0 text-xs">Ring</span>
            </button>
          </div>
        </div>
      );
    },
    valueInput: ({
      value,
      setValue,
    }: {
      value: any;
      setValue: (value: any) => void;
    }) => (
      <Input
        value={value}
        onChange={(e) => setValue(parseInt(e.currentTarget.value))}
      />
    ),
    button: ({ value, options }: { value: any; options: any }) => {
      return (
        <div className="flex w-full items-center gap-1">
          {value}
          {options?.showAs === "bar" && (
            <Progress value={value} max={100} className="h-2 w-16" />
          )}
          {options?.showAs === "ring" && (
            <RingProgress value={value} max={100} radius={7} />
          )}
        </div>
      );
    },
  },
  select: {
    name: "Select",
    icon: "select" as IconKey,
    defaultValue: null,
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => (
      <div className="w-full">
        <span>Number</span>
        <span>Bar</span>
        <span>Circle</span>
      </div>
    ),
    valueInput: ({
        value,
        setValue,
      }: {
        value: string;
        setValue: (value: any) => void;
      }) => {
       
        const tags: Tag[] =  !!value ? [{ id: value, text: value }] : [];
        const onSetTags = (newTags: Tag[]) => {
          setValue(newTags[0]?.text);
        }
    const [activeTagIndex, setActiveTagIndex] = useState < number | null > (null);
  
        return (
          <TagInput
            tags={tags}
            setTags={(newTags) => onSetTags(newTags as Tag[])}
            placeholder="Add a tag"
            styleClasses={{
              input: "w-full sm:max-w-[350px]",
            }}
            activeTagIndex={activeTagIndex}
            setActiveTagIndex={setActiveTagIndex}
            variant="primary"
            size="sm"
            animation="fadeIn"
            enableAutocomplete
            autocompleteOptions={tags}
            maxTags={1}
          />
        );
      },
      button: ({ value, options }: { value: any; options: any }) => (
          <div className="flex gap-2 min-h-5">
            {value && (
             <Badge  className="font-normal text-xs rounded-sm px-2"> {value} </Badge>
            )}
        </div>
        
      ),
  },
  multiSelect: {
    name: "Multi Select",
    icon: "list" as IconKey,
    defaultValue: [],
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => (
      <div className="w-full">
        <span>Number</span>
        <span>Bar</span>
        <span>Circle</span>
      </div>
    ),
    valueInput: ({
      value,
      setValue,
    }: {
      value: string[];
      setValue: (value: any) => void;
    }) => {
      const tags: Tag[] = value.map((tag) => {
        return {
          id: tag,
          text: tag,
        };
      });
      const onSetTags = (newTags: Tag[]) => {
        setValue(newTags.map((tag) => tag.text));
      }
  const [activeTagIndex, setActiveTagIndex] = useState < number | null > (null);

      return (
        <TagInput
          tags={tags}
          setTags={(newTags) => onSetTags(newTags as Tag[])}
          placeholder="Add a tag"
          styleClasses={{
            input: "w-full sm:max-w-[350px]",
          }}
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
          variant="primary"
          size="sm"
          animation="fadeIn"
          enableAutocomplete
          autocompleteOptions={tags}
        />
        //   <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
      );
    },
    button: ({ value, options }: { value: any; options: any }) => (
        <div className="flex gap-2 flex-wrap min-h-5">
        {value.map((tag : string) => (
          <Badge key={tag} className="font-normal text-xs rounded-sm px-2"> {tag} </Badge>
        ))}
      </div>
      
    ),
  },
  status: {
    name: "Status",
    icon: "loader" as IconKey,
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => (
      <div className="w-full">
        <span>Numberssss</span>
        <span>Bar</span>
        <span>Circle</span>
      </div>
    ),
    valueInput: ({
      value,
      setValue,
    }: {
      value: any;
      setValue: (value: any) => void;
    }) => (
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }: { value: any; options: any }) => (
      <Status>{value}</Status>
    ),
  },
  email: {
    name: "Email",
    icon: "at" as IconKey,
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => (
      <div className="w-full">
        <span>Number</span>
        <span>Bar</span>
        <span>Circle</span>
      </div>
    ),
    valueInput: ({
      value,
      setValue,
    }: {
      value: any;
      setValue: (value: any) => void;
    }) => (
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }: { value: any; options: any }) => (
      <a href={"mailto:" + value}>{value}</a>
    ),
  },
  phone: {
    name: "Phone",
    icon: "phone" as IconKey,
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => (
      <div className="w-full">
        <span>Number</span>
        <span>Bar</span>
        <span>Circle</span>
      </div>
    ),
    valueInput: ({
      value,
      setValue,
    }: {
      value: any;
      setValue: (value: any) => void;
    }) => (
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }: { value: any; options: any }) => (
      <a href={"tel:" + value}>{value}</a>
    ),
  },
  url: {
    name: "URL",
    icon: "link" as IconKey,
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => (
      <div className="w-full">
        <span>Number</span>
        <span>Bar</span>
        <span>Circle</span>
      </div>
    ),
    valueInput: ({
      value,
      setValue,
    }: {
      value: any;
      setValue: (value: any) => void;
    }) => (
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }: { value: any; options: any }) => (
      <Link href={value}>{value.replace("https://", "")}</Link>
    ),
  },
  file_media: {
    name: "Files & Media",
    icon: "paperclip" as IconKey,
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => (
      <div className="w-full">
        <span>Number</span>
        <span>Bar</span>
        <span>Circle</span>
      </div>
    ),
    valueInput: ({
      value,
      setValue,
    }: {
      value: any;
      setValue: (value: any) => void;
    }) => (
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }: { value: any; options: any }) => (
      <div>{value}</div>
    ),
  },
};
export type CustomFieldTypeKey = keyof typeof CustomFieldTypes;
