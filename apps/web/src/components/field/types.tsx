import { useState } from "react";
import Link from "next/link";

import type { Tag } from "@knowingly/ui/tag-input";
import type {
  FieldOptions,
  FieldType,
  FieldValue,
  Icon,
} from "@knowingly/backend/convex/types";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Badge } from "@knowingly/ui/badge";
import { Button } from "@knowingly/ui/button";
import { GaugeCircle } from "@knowingly/ui/gauge-circle";
import { Input } from "@knowingly/ui/input";
import { Progress } from "@knowingly/ui/progress";
import { Status } from "@knowingly/ui/status";
import { TagInput } from "@knowingly/ui/tag-input";

import { FileUploadModal } from "../file-uploader/modal";

type FieldTypes = {
  [key in FieldType]: {
    name: string;
    icon: Icon;
    defaultValue: FieldValue;
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: FieldOptions;
      setOptions: (options: FieldOptions) => void;
    }) => JSX.Element;
    valueInput: ({
      value,
      setValue,
    }: {
      value: FieldValue;
      setValue: (value: FieldValue) => void;
    }) => JSX.Element;
    button: ({
      value,
      options,
    }: {
      value: FieldValue;
      options: FieldOptions;
    }) => JSX.Element;
  };
};
export const Fields: FieldTypes = {
  TEXT: {
    name: "Text",
    icon: {
      type: "ICON",
      value: "alignLeft",
    },
    defaultValue: "",
    renderSettings: ({ options, setOptions }) => <div className="w-full"></div>,
    valueInput: ({ value, setValue }) => (
      <Input
        value={value as string}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    ),
    button: ({ value, options }) => <div>{value}</div>,
  },
  NUMBER: {
    name: "Number",
    icon: {
      type: "ICON",
      value: "hash",
    },
    defaultValue: 0,
    renderSettings: ({ options, setOptions }) => {
      const onValueChange = (value: string) => {
        setOptions({ ...options, showAs: value });
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
                "relative flex h-12 w-full flex-col items-center rounded-md border pt-1 transition-all duration-150 ease-in-out",
                options?.showAs === "ring" && "border-2 border-primary",
              )}
              onClick={() => onValueChange("ring")}
            >
              <GaugeCircle
                value={number}
                max={100}
                min={0}
                showNumber={false}
                className="size-5"
              />
              <span className="absolute bottom-0 text-xs">Ring</span>
            </button>
          </div>
        </div>
      );
    },
    valueInput: ({ value, setValue }) => (
      <Input
        value={value as number}
        onChange={(e) => setValue(parseInt(e.currentTarget.value))}
      />
    ),
    button: ({ value, options }) => {
      if (typeof value !== "number") throw new Error("Value must be a number");
      return (
        <div className="flex min-h-5 w-full items-center gap-1">
          {options.showAs === "number" && value}
          {options.showAs === "bar" && (
            <Progress value={value} max={100} className="h-2 w-16" />
          )}
          {options?.showAs === "ring" && (
            <GaugeCircle value={value} max={100} min={0} className="size-10" />
          )}
        </div>
      );
    },
  },
  SELECT: {
    name: "Select",
    icon: {
      type: "ICON",
      value: "select",
    },
    defaultValue: "",
    renderSettings: ({ options, setOptions }) => <div className="w-full"></div>,
    valueInput: ({ value, setValue }) => {
      if (typeof value !== "string") throw new Error("Value must be a string");
      const tags: Tag[] = value ? [{ id: value, text: value }] : [];
      const onSetTags = (newTags: Tag[]) => {
        setValue(newTags[0]?.text ?? "");
      };
      const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

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
    button: ({ value, options }) => (
      <div className="flex min-h-5 gap-2">
        {value && (
          <Badge className="rounded-sm px-2 text-xs font-normal">
            {" "}
            {value}{" "}
          </Badge>
        )}
      </div>
    ),
  },
  MULTI_SELECT: {
    name: "Multi Select",
    icon: {
      type: "ICON",
      value: "list",
    },
    defaultValue: [],
    renderSettings: ({ options, setOptions }) => <div className="w-full"></div>,
    valueInput: ({ value, setValue }) => {
      if (!Array.isArray(value)) throw new Error("Value must be an array");
      const tags: Tag[] = value.map((tag) => {
        return {
          id: tag,
          text: tag,
        };
      });
      const onSetTags = (newTags: Tag[]) => {
        setValue(newTags.map((tag) => tag.text));
      };
      const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

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
      );
    },
    button: ({ value, options }) => {
      if (!Array.isArray(value)) throw new Error("Value must be an array");
      return (
        <div className="flex min-h-5 flex-wrap gap-2">
          {value.map((tag) => (
            <Badge key={tag} className="rounded-sm px-2 text-xs font-normal">
              {" "}
              {tag}{" "}
            </Badge>
          ))}
        </div>
      );
    },
  },
  STATUS: {
    name: "Status",
    icon: {
      type: "ICON",
      value: "loader",
    },
    defaultValue: "",
    renderSettings: ({ options, setOptions }) => <div className="w-full"></div>,
    valueInput: ({ value, setValue }) => (
      <Input
        value={value as string}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    ),
    button: ({ value, options }) => <Status>{value}</Status>,
  },
  EMAIL: {
    name: "Email",
    icon: {
      type: "ICON",
      value: "at",
    },
    defaultValue: "",
    renderSettings: ({ options, setOptions }) => <div className="w-full"></div>,
    valueInput: ({ value, setValue }) => (
      <Input
        value={value as string}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    ),
    button: ({ value, options }) => <a href={"mailto:" + value}>{value}</a>,
  },
  PHONE: {
    name: "Phone",
    icon: {
      type: "ICON",
      value: "phone",
    },
    defaultValue: "",
    renderSettings: ({ options, setOptions }) => <div className="w-full"></div>,
    valueInput: ({
      value,
      setValue,
    }) => (
      <Input value={value as string} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }) => (
      <a href={"tel:" + value}>{value}</a>
    ),
  },
  URL: {
    name: "URL",
    icon: {
      type: "ICON",
      value: "link",
    },
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }) => <div className="w-full"></div>,
    valueInput: ({
      value,
      setValue,
    }) => (
      <Input value={value as string} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }) => (
      <Link href={value}>{value.replace("https://", "")}</Link>
    ),
  },
  FILE: {
    name: "File",
    icon: {
      type: "ICON",
      value: "paperclip",
    },
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }) => <div className="w-full"></div>,
    valueInput: ({
      value,
      setValue,
    }) => {
      const [fileUploaderOpen, setFileUploaderOpen] = useState(false);
      const onUpload = (upload: string) => {
        setValue(upload);
      };
      return (
        <div>
          <FileUploadModal
            open={fileUploaderOpen}
            setOpen={setFileUploaderOpen}
            setUpload={onUpload}
            recommendedAspect={16 / 9}
          />
          <Button
            variant={"ringHover"}
            className="absolute bottom-0 right-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            size="sm"
            onClick={() => setFileUploaderOpen(true)}
          >
            <Icons.pencil className="mr-1 size-4" />
            Edit
          </Button>
        </div>
      );
    },
    button: ({ value, options }) => (
      <div>{value}</div>
    ),
  },
  MEDIA_EMBEDDING: {
    name: "Media Embedding",
    icon: {
      type: "ICON",
      value: "music",
    },
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }) => {
      const onValueChange = (value: string) => {
        setOptions(({ ...options, format: value }));
      };
      return (
        <div>
          <span className="text-sm text-muted-foreground">Source</span>
          <div className="grid grid-cols-3 gap-1">
            <button
              className={cn(
                "relative flex h-12 w-full flex-col items-center rounded-md border pt-1 transition-all duration-150 ease-in-out",
                options?.format !== "soundcloud" &&
                  options?.format !== "youtube" &&
                  "border-2 border-primary",
              )}
              onClick={() => onValueChange("spotify")}
            >
              <Icons.spotify className="size-6" />
              <span className="absolute bottom-0 text-xs">Spotify</span>
            </button>
            <button
              className={cn(
                "relative flex h-12 w-full flex-col items-center rounded-md border  pt-1 transition-all duration-150 ease-in-out",
                options?.format === "soundcloud" && "border-2 border-primary",
              )}
              onClick={() => onValueChange("soundcloud")}
            >
              <Icons.soundcloud className="size-6" />
              <span className="absolute bottom-0 text-xs">Soundcloud</span>
            </button>
            <button
              className={cn(
                "relative flex h-12 w-full flex-col items-center rounded-md border pt-1 transition-all duration-150 ease-in-out",
                options?.format === "youtube" && "border-2 border-primary",
              )}
              onClick={() => onValueChange("youtube")}
            >
              <Icons.youtube className="size-6" />

              <span className="absolute bottom-0 text-xs">Youtube</span>
            </button>
          </div>
        </div>
      );
    },
    valueInput: ({
      value,
      setValue,
    }) => (
      <Input value={value as string} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }) => {
      if (typeof value !== "string") throw new Error("Value must be a string");
      let src = value;
      const format = options.format ?? "spotify";
      switch (format) {
        case "spotify":
          src = value.replace("open.spotify.com", "open.spotify.com/embed");

          return (
            <iframe
              className="h-20 w-full rounded-xl "
              src={src}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          );
        case "soundcloud":
          // Transform SoundCloud link to embed format
          src =
            value.replace("soundcloud.com", "w.soundcloud.com/player") +
            "&url=" +
            encodeURIComponent(value);
          return (
            <iframe
              className="h-32 w-full rounded-xl"
              allow="autoplay"
              src={src}
            ></iframe>
          );
        case "youtube":
          src = value.replace("watch?v=", "embed/");
          return (
            <iframe
              className="aspect-video w-full rounded-xl"
              src={src}
              title="YouTube Audio player"
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          );
        default:
          src = value.replace("open.spotify.com", "open.spotify.com/embed");
          return (
            <iframe
              className="h-20 w-full rounded-xl "
              src={src}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          );
      }
    },
  },
};
