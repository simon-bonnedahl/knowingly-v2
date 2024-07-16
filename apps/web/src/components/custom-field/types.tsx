import { url } from "inspector";

import { Input } from "@knowingly/ui/input";
import { Label } from "@knowingly/ui/label";
import { Progress } from "@knowingly/ui/progress";
import { RadioGroup, RadioGroupItem } from "@knowingly/ui/radio-group";

import { IconKey } from "../icons";
import { RingProgress } from "../ring-progress";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { Badge } from "@knowingly/ui/badge";

export const CustomFieldTypes = {
  text: {
    name: "Text",
    icon: "alignLeft" as IconKey,
    defaultValue : "",
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
    defaultValue : 0,
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
      const number = 66
      return (
        <div>
        <span className="text-sm text-muted-foreground">Show as</span>
        <div className="grid grid-cols-3 gap-1">
            <button className={cn("w-full rounded-md border flex flex-col items-center pt-2 h-12 relative transition-all duration-150 ease-in-out", (options?.showAs !== "bar" && options?.showAs !== "ring") && "border-primary border-2")} onClick={() => onValueChange("number")}>
                <span className="font-medium text-sm" >{number}</span>
                <span className="text-xs absolute bottom-0">Number</span>
            </button>
            <button className={cn("w-full rounded-md border flex flex-col items-center pt-4 h-12 relative transition-all duration-150 ease-in-out", options?.showAs === "bar" && "border-primary border-2")} onClick={() => onValueChange("bar")}>
                <Progress value={number} max={100} className="w-8 h-1" />
                <span className="text-xs absolute bottom-0">Bar</span>
            </button>
            <button className={cn("w-full rounded-md border flex flex-col items-center h-12 relative transition-all duration-150 ease-in-out", options?.showAs === "ring" && "border-primary border-2")} onClick={() => onValueChange("ring")}>
                <RingProgress value={number} max={100} radius={8} />
                <span className="text-xs absolute bottom-0">Ring</span>
                
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
        type="number"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    ),
    button: ({ value, options }: { value: any; options: any }) => {
      return (
        <div className="flex w-full items-center gap-1">
          {value}
          {options?.showAs === "bar" && (
            <Progress value={value} max={100} className="w-16 h-2" />
          )}
          {options?.showAs === "ring" && (
            <RingProgress value={value} max={100} radius={9} />
          )}
        </div>
      );
    },
  },
  select: {
    name: "Select",
    icon: "select" as IconKey,
    defaultValue : "",
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
  multiSelect: {
    name: "Multi Select",
    icon: "list" as IconKey,
    defaultValue : [],
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
  status: {
    name: "Status",
    icon: "loader" as IconKey,
    defaultValue : "",
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
      <Badge variant="successful">{value}</Badge>
    ),
  },
  email: {
    name: "Email",
    icon: "at" as IconKey,
    defaultValue : "",
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
    defaultValue : "",
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
    defaultValue : "",
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
    defaultValue : "",
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
