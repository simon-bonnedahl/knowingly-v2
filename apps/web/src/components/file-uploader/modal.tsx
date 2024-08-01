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
import { LoadingDots } from "../loaders";
import { Skeleton } from "@knowingly/ui/skeleton";

interface FileUploadModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setFile: (file: string) => void;
  recommendedAspect ?: number;
}

export const FileUploadModal = ({
  open,
  setOpen,
  setFile,
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

        {uploads?.length ? (
          <div className="grid w-full grid-cols-6 gap-1">
            {uploads?.map((upload) => (
              <Button
                variant={"ringHover"}
                className="h-fit w-fit p-0"
                onClick={() => {
                  setFile(upload as string);
                  setOpen(false);
                }}
                key={upload}
              >
                <Image
                  src={upload ?? ""}
                  alt={upload ?? ""}
                  width={100}
                  height={100}
                  className="w-full rounded-md "
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
