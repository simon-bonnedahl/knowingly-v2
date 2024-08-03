"use client";

import {  useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Button } from "@knowingly/ui/button";
import { Skeleton } from "@knowingly/ui/skeleton";

import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { FileUploadModal } from "./file-uploader/modal";

interface BannerProps {
  url?: string;
  preview?: boolean;
  page?: boolean;
}

export const Banner = ({ url, preview, page=false }: BannerProps) => {
  const subdomain = useSubdomain();
  const { slug } = useParams();
  const updateHub = useMutation(api.hubs.update);
  const updatePage = useMutation(api.pages.update);
  const [fileUploaderOpen, setFileUploaderOpen] = useState(false);
  const [banner, setBanner] = useState(url);
  const onUpload = (upload: string) => {
    setBanner(upload);
    if (page) {
      return toast.promise(updatePage({ slug, field: "image", value: upload }), {
        loading: "Updating banner...",
        success: "Success: Banner updated",
        error: (error) => {
          setBanner(url);
          return `Error: ${error.data}`;
        },
      });
    }
    toast.promise(updateHub({ subdomain, field: "banner", value: upload }), {
      loading: "Updating banner...",
      success: "Success: Banner updated",
      error: (error) => {
        setBanner(url);
        return `Error: ${error.data}`;
      },
    });
  };

  return (
    <div
      className={cn(
        "group relative h-[30vh] w-full overflow-clip rounded-tl-3xl",
        !banner && "h-[12vh]",
        banner && "bg-muted",
      )}
    >
      {!!banner && (
        <Image
          src={banner}
          fill
          alt="Cover"
          className="rounded-tl-3xl object-cover "
        />
      )}
      {banner && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
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
      )}
    </div>
  );
};

Banner.Skeleton = function BannerSkeleton() {
  return <Skeleton className="h-[12vh] w-full" />;
};
