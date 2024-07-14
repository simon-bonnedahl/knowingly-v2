"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";



import { SingleImageDropzone } from "../single-age-dropzone";
import { api } from "@knowingly/backend/convex/_generated/api";
import { useBanner } from "@/lib/hooks/useBanner";
import { useEdgeStore } from "@/lib/edgestore";
import { useSubdomain } from "@/lib/hooks/useSubdomain";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "@knowingly/ui/dialog";

export const UploadBannerModal = () => {
  const params = useParams();
  const update = useMutation(api.hubs.update);
  const banner = useBanner();
  const { edgestore } = useEdgeStore();
  const subdomain = useSubdomain();
  
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    banner.onClose();
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: banner.url
        }
      });

      await update({
        subdomain,
        field: "banner",
        value: res.url
      });

      onClose();
    }
  }

  return (
    <Dialog open={banner.isOpen} onOpenChange={banner.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Banner
          </h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
