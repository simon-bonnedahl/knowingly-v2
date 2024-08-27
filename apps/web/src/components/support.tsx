"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Button } from "@knowingly/ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@knowingly/ui/modal";
import {
  supportTicketSchema,
  SupportTicketSchema,
} from "@knowingly/validators";

import { SupportForm } from "./forms/support-form";
import { FileUploader } from "./file-uploader";
import { toast } from "sonner";
import { Id } from "@knowingly/backend/convex/_generated/dataModel";
import { Label } from "@knowingly/ui/label";

export function Support() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const [files, setFiles] = React.useState<File[]>([]);
  const onUpload = async (files: File[]) => {
    if (files.length === 0) return;
    const uploaded = await startUpload(files);
    return uploaded.map((upload) => upload.response.storageId);
  };

  const form = useForm<SupportTicketSchema>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: {
      category: "SUPPORT",
      title: "",
      body: "",
      files: [],
    },
  });

  const createSupportTicket = useMutation(api.supportTickets.create);

  const onSubmit = async (data: SupportTicketSchema) => {
    setLoading(true);
    const storageIds = await onUpload(files) as Id<"_storage">[];

    setOpen(false);
    toast.promise(
        createSupportTicket({
            ...data,
            files: storageIds,
        }),
        {
            loading: "Sending support ticket...",
            success: () => {
                form.reset();
                return "Success: Support ticket sent";
            },
            error: (error) => {
                setOpen(true);
                return `Error: ${error.data ?? "Unknown error"}`;
            },
        },
        );
    setLoading(false);
    
  };

  return (
    <>
      <button
        id="search"
        className={cn(
          "flex items-center gap-3 rounded-md bg-transparent px-4  py-2 text-sm font-normal text-foreground transition-all duration-150 ease-in-out hover:bg-card ",
        )}
        onClick={() => setOpen(true)}
      >
        <Icons.heartHandshake className="h-5 w-5" />
        Help / Support
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Support</ModalTitle>
            <ModalDescription>Need help or got anything you want to let us know?</ModalDescription>
          </ModalHeader>
          <SupportForm form={form} onSubmit={onSubmit}>
            <Label>Files (optional)</Label>
            
            <FileUploader
              withCropping={false}
              maxFiles={3}
              onValueChange={setFiles}
            />
            <ModalFooter className="gap-2 pt-2 sm:space-x-0">
              <ModalClose asChild>
                <Button size={"sm"} variant="outline">
                  Cancel
                </Button>
              </ModalClose>
              <Button size={"sm"} disabled={false}>
                {loading ? <Icons.loader className="animate-spin size-4" /> : "Send"}
              </Button>
            </ModalFooter>
          </SupportForm>
        </ModalContent>
      </Modal>
    </>
  );
}
