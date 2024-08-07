"use client";

import Image from "next/image";
import { useQuery } from "convex/react";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Button } from "@knowingly/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@knowingly/ui/modal";
import { Separator } from "@knowingly/ui/separator";

import { FileUploader } from ".";
import { Skeleton } from "@knowingly/ui/skeleton";

interface FileUploadModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setUpload: (file: string) => void;
  recommendedAspect ?: number;
}

export const FileUploadModal = ({
  open,
  setOpen,
  setUpload,
 recommendedAspect,
}: FileUploadModalProps) => {
  const uploads = useQuery(api.users.getUploads);

  if (!open) return null;

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Upload or select file</ModalTitle>
          <ModalDescription>
            Select a file from your uploads or upload a new one.
          </ModalDescription>
        </ModalHeader>

        <FileUploader recommendedAspect={recommendedAspect} />
        <Separator />

        <ModalDescription>Uploads</ModalDescription>

        {uploads ? (
          <div className="flex w-full flex-wrap gap-2">
            {uploads?.map((upload) => (
              <Button
                variant={"ringHover"}
                className=" p-0 flex transform items-center justify-center rounded-md transition-all duration-200 hover:scale-110 border-none"
                onClick={() => {
                  setUpload(upload);
                  setOpen(false);
                }}
                key={upload}
              >
                <Image
                  src={upload ?? ""}
                  alt={upload ?? ""}
                  width={100}
                  height={100}
                  className="size-full object-cover rounded-md"
                />
              </Button>
            ))}
          </div>
        ) : (
            <div className="grid w-full grid-cols-6 gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-20 rounded-md " />
                ))}
            </div>
        )}
      </ModalContent>
    </Modal>
  );
};
