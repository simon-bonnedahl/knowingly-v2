import { useState } from "react";
import Link from "next/link";

import { Badge } from "@knowingly/ui/badge";
import { Input } from "@knowingly/ui/input";
import { Progress } from "@knowingly/ui/progress";
import { Status } from "@knowingly/ui/status";
import type { Tag } from "@knowingly/ui/tag-input";
import { TagInput } from "@knowingly/ui/tag-input";

import { cn } from "@knowingly/ui";
import { FileUploader } from "../file-uploader";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle, ModalTrigger } from "@knowingly/ui/modal";
import { Button } from "@knowingly/ui/button";
import { GaugeCircle } from "@knowingly/ui/gauge-circle";
import type { IconKey} from "@knowingly/icons";
import { Icons } from "@knowingly/icons";


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
                "relative flex h-12 w-full flex-col items-center rounded-md border transition-all duration-150 ease-in-out pt-1",
                options?.showAs === "ring" && "border-2 border-primary",
              )}
              onClick={() => onValueChange("ring")}
            >
              <GaugeCircle value={number} max={100} min={0}  showNumber={false} className="size-5"/>
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
        <div className="flex w-full items-center gap-1 min-h-5">
          {options?.showAs === "number" && value}
          {options?.showAs === "bar" && (
            <Progress value={value} max={100} className="h-2 w-16" />
          )}
          {options?.showAs === "ring" && (
            <GaugeCircle value={value} max={100} min={0}  className="size-10"/>
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
    
      </div>
    ),
    valueInput: ({
      value,
      setValue,
    }: {
      value: string;
      setValue: (value: any) => void;
    }) => {
      const tags: Tag[] = value ? [{ id: value, text: value }] : [];
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

      </div>
    ),
    valueInput: ({
      value,
      setValue,
    }: {
      value: string[];
      setValue: (value: any) => void;
    }) => {
      const tags: Tag[] = value?.map((tag) => {
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

      </div>
    ),
    valueInput: ({
      value,
      setValue,
    }: {
      value: any;
      setValue: (value: any) => void;
    }) => {
        const getUploadUrl = useMutation(api.files.generateUploadUrl);
        const [files, setFiles] = useState<File[]>([])
        const { startUpload, isUploading } = useUploadFiles(getUploadUrl)
          return(
            <div>

            <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">
          Upload files {files.length > 0 && `(${files.length})`}
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-xl">
        <ModalHeader>
          <ModalTitle>Upload files</ModalTitle>
          <ModalDescription>
            Drag and drop your files here or click to browse.
          </ModalDescription>
        </ModalHeader>
        <FileUploader
        maxFiles={4}
        maxSize={4 * 1024 * 1024}
        onUpload={startUpload}
        // value={files} 
        // onValueChange={setFiles}
        disabled={isUploading}
      />
      </ModalContent>
    </Modal>
    </div>

       )
    },
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
                "relative flex h-12 w-full flex-col items-center rounded-md border transition-all duration-150 ease-in-out pt-1",
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
              className="h-20 rounded-xl w-full "
              src={src}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          );
        case "soundcloud":
          // Transform SoundCloud link to embed format
          src =
            value.replace("soundcloud.com", "w.soundcloud.com/player") +
            "&url=" +encodeURIComponent(value);
          return (
            <iframe
              className="rounded-xl w-full h-32"
              allow="autoplay"
              src={src}
            ></iframe>
          );
        case "youtube":
          src = value.replace("watch?v=", "embed/");
          return (
            <iframe
              
              className="w-full aspect-video rounded-xl"
              src={src}
              title="YouTube Audio player"
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          );
        default:
          src = value.replace("open.spotify.com", "open.spotify.com/embed");
          return (
            <iframe
              className="h-20 rounded-xl w-full "
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
