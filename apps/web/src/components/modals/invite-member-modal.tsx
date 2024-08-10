"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Id } from "@knowingly/backend/convex/_generated/dataModel";
import type { InviteMemberSchema } from "@knowingly/validators";
import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { Button } from "@knowingly/ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@knowingly/ui/modal";
import { inviteMemberSchema } from "@knowingly/validators";

import { useSubdomain } from "~/lib/hooks/useSubdomain";
import { InviteMemberForm } from "../forms/invite-member-form";

interface InviteMemberModalProps {
  children: React.ReactNode;
  initialData?: InviteMemberSchema;
}
export function InviteMemberModal({children, initialData} : InviteMemberModalProps) {
  const [open, setOpen] = React.useState(false);
  const subdomain = useSubdomain();

  const sendInvite = useAction(api.hubInvites.send);

  const form = useForm<InviteMemberSchema>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: initialData?.email ?? "",
      roleId: initialData?.roleId ?? "",
      message: "",
    },
  });

  function onSubmit(input: InviteMemberSchema) {
    toast.promise(
      sendInvite({
        email: input.email,
        roleId: input.roleId as Id<"roles">,
        message: input.message,
        subdomain,
      }),
      {
        loading: "Sending invite...",
        success: () => {
          form.reset();
          setOpen(false);
          return "Success: Invite sent!";
        },
        error: (error) =>  {
          return `Error: ${error.data}`
     },
      },
    );
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        {children}
        
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Invite member</ModalTitle>
          <ModalDescription>
            Fill in the details below to invite.
          </ModalDescription>
        </ModalHeader>
        <InviteMemberForm form={form} onSubmit={onSubmit}>
          <ModalFooter className="gap-2 pt-2 sm:space-x-0">
            <ModalClose asChild>
              <Button size={"sm"} variant="outline">
                Cancel
              </Button>
            </ModalClose>
            <Button
              size={"sm"}
              disabled={
                !form.getValues().email ||
                !form.getValues().roleId
              }
            >
              Invite
            </Button>
          </ModalFooter>
        </InviteMemberForm>
      </ModalContent>
    </Modal>
  );
}
