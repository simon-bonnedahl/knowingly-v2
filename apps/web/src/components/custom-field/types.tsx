import { url } from "inspector";
import { useState } from "react";
import Link from "next/link";

import { Badge } from "@knowingly/ui/badge";
import { Input } from "@knowingly/ui/input";
import { Label } from "@knowingly/ui/label";
import { Progress } from "@knowingly/ui/progress";
import { RadioGroup, RadioGroupItem } from "@knowingly/ui/radio-group";
import { Status } from "@knowingly/ui/status";
import { Tag, TagInput } from "@knowingly/ui/tag-input";

import { cn } from "~/lib/utils";
import { IconKey, Icons } from "../icons";
import { RingProgress } from "../ring-progress";

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
      const tags: Tag[] = !!value ? [{ id: value, text: value }] : [];
      const onSetTags = (newTags: Tag[]) => {
        setValue(newTags[0]?.text);
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
    button: ({ value, options }: { value: any; options: any }) => (
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
        //   <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
      );
    },
    button: ({ value, options }: { value: any; options: any }) => (
      <div className="flex min-h-5 flex-wrap gap-2">
        {value.map((tag: string) => (
          <Badge key={tag} className="rounded-sm px-2 text-xs font-normal">
            {" "}
            {tag}{" "}
          </Badge>
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
  mediaEmbedding: {
    name: "Media Embedding",
    icon: "music" as IconKey,
    defaultValue: "",
    renderSettings: ({
      options,
      setOptions,
    }: {
      options: any;
      setOptions: (options: any) => void;
    }) => {
      const onValueChange = (value: any) => {
        setOptions((options) => ({ ...options, format: value }));
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
              <Icons.spotify className="h-7 w-7" />
              <span className="absolute bottom-0 text-xs">Spotify</span>
            </button>
            <button
              className={cn(
                "relative flex h-12 w-full flex-col items-center rounded-md border  pt-1 transition-all duration-150 ease-in-out",
                options?.format === "soundcloud" && "border-2 border-primary",
              )}
              onClick={() => onValueChange("soundcloud")}
            >
              <Icons.soundcloud className="h-7 w-7" />
              <span className="absolute bottom-0 text-xs">Soundcloud</span>
            </button>
            <button
              className={cn(
                "relative flex h-12 w-full flex-col items-center rounded-md border transition-all duration-150 ease-in-out",
                options?.format === "youtube" && "border-2 border-primary",
              )}
              onClick={() => onValueChange("youtube")}
            >
              <Icons.youtube className="h-7 w-7" />

              <span className="absolute bottom-0 text-xs">Youtube</span>
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
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    ),
    button: ({ value, options }: { value: any; options: any }) => {
      let src = value;
      const format = options?.format ?? "spotify";
      switch (format) {
        case "spotify":
          src = value.replace("open.spotify.com", "open.spotify.com/embed");

          return (
            <iframe
              className="h-20 rounded-md w-full"
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
            encodeURIComponent(value) +
            "&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true";
          return (
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={src}
            ></iframe>
          );
        case "youtube":
          src = value.replace("watch?v=", "embed/");
          return (
            <iframe
              
              className="w-full h-auto rounded-md"
              src={src}
              title="YouTube Audio player"
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          );
        default:
          src = value.replace("open.spotify.com", "open.spotify.com/embed");
          return (
            <iframe
              className="h-20 rounded-md"
              src={src}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          );
      }
    },
  },
};
export type CustomFieldTypeKey = keyof typeof CustomFieldTypes;
