"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import type { Id } from "@knowingly/backend/convex/_generated/dataModel";
import type { Banner as BannerType } from "@knowingly/backend/convex/types";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Button } from "@knowingly/ui/button";
import { Skeleton } from "@knowingly/ui/skeleton";

import { useEdit } from "~/lib/hooks/useEdit";
import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { FileUploadModal } from "./file-uploader/modal";

interface BannerProps {
  banner: BannerType;
  isPage?: boolean;
}

export const Banner = ({ banner, isPage = false }: BannerProps) => {
  const subdomain = useSubdomain();
  const { id } = useParams();
  const { edit } = useEdit();
  const updateHub = useMutation(api.hubs.update);
  const updatePage = useMutation(api.pages.update);
  const [_banner, setBanner] = useState(banner);
  const [isLoading, setLoading] = useState(true);
  const [fileUploaderOpen, setFileUploaderOpen] = useState(false);
  const onUpload = (upload: string) => {
    setBanner({ type: "URL", value: upload });
    if (isPage) {
      return toast.promise(
        updatePage({
          id: id as Id<"pages">,
          field: "banner",
          value: { type: "URL", value: upload },
        }),
        {
          loading: "Updating banner...",
          success: "Success: Banner updated",
          error: (error) => {
            return `Error: ${error.data ?? "Unknown error"}`;
          },
        },
      );
    }
    toast.promise(
      updateHub({
        subdomain,
        field: "banner",
        value: { type: "URL", value: upload },
      }),
      {
        loading: "Updating banner...",
        success: "Success: Banner updated",
        error: (error) => {
          return `Error: ${error.data ?? "Unknown error"}`;
        },
      },
    );
  };

  return (
    <div className={cn("group relative h-[30vh] w-full overflow-clip ")}>
      {_banner.type === "URL" && (
        <Image
          className={cn(
            "transform transition duration-300",
            isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
            "size-full object-cover ",
          )}
          onLoad={() => setLoading(false)}
          src={_banner.value}
          width={600}
          height={200}
          priority
          decoding="async"
          blurDataURL={_banner.value}
          alt="Banner"
        />
      )}
      {_banner.type === "COLOR" && (
        <div
          className={`size-full  `}
          style={{ backgroundColor: _banner.value }}
        ></div>
      )}
      {edit && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <FileUploadModal
            open={fileUploaderOpen}
            setOpen={setFileUploaderOpen}
            setUpload={onUpload}
            recommendedAspect={3.5}
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
