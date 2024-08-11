"use client";

import Image from "next/image";
import type { FunctionReturnType } from "convex/server";

import { api } from "@knowingly/backend/convex/_generated/api";
import { Icons } from "@knowingly/icons";
import { cn } from "@knowingly/ui";
import { Button, buttonVariants } from "@knowingly/ui/button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@knowingly/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { RenderIcon } from "../icon-picker/render-icon";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { RequestInviteForm } from "../forms/request-invite-form";
import type { RequestInviteSchema} from "@knowingly/validators";
import { requestInviteSchema } from "@knowingly/validators";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Id } from "@knowingly/backend/convex/_generated/dataModel";

interface RequestInviteModalProps {
  hub: FunctionReturnType<typeof api.hubs.getHub>;
}

export function RequestInviteModal({ hub }: RequestInviteModalProps) {
  const user = useQuery(api.users.getMe);
  const [open, setOpen] = useState(false);

  const sendRequest = useMutation(api.inviteRequests.create)

  const form = useForm<RequestInviteSchema>({
    resolver: zodResolver(requestInviteSchema),
    defaultValues: {
      email: "",
      roleId: "",
      message: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email);
    }
  }
    , [user])


  function onSubmit(input: RequestInviteSchema) {
    if(!hub) return
    toast.promise(
      sendRequest({
        userId: user?._id,
        email: input.email,
        roleId: input.roleId as Id<"roles">,
        message: input.message,
        hubId: hub._id,
      }),
      {
        loading: "Requesting...",
        success: () => {
          form.reset();
          setOpen(false);
          return "Success: Request sent!";
        },
        error: (error) =>  {
          return `Error: ${error.data ?? "Something went wrong"}`;
     },
      },
    );
  }


  if (!hub) {
    return null;
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger
        className={cn(buttonVariants({ variant: "ringHover", size: "sm" }))}
      >
        <Icons.userUp className="mr-2 h-4 w-4" />
        Request invite
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            Request to join <span className="font-black">{hub.name}</span>{" "}
          </ModalTitle>
        </ModalHeader>
        <div className="relative">
          <Image src={hub.banner.value} width={600} height={200} alt="Banner" className="w-full aspect-banner object-cover rounded-xl " />
          <RenderIcon
            icon={hub.icon}
            size={2}
            className="absolute -right-2 -top-4"
          />
        </div>

        <RequestInviteForm form={form} onSubmit={onSubmit} user={user}>
          <ModalFooter className="gap-2 pt-2 sm:space-x-0">
            <ModalClose asChild>
              <Button size={"sm"} variant="outline">
                Cancel
              </Button>
            </ModalClose>
            <Button
              size={"sm"}
              disabled={
                 (!form.getValues().email && !user) || !form.getValues().roleId
              }
            >
              Request
            </Button>
          </ModalFooter>
        </RequestInviteForm>
        

      </ModalContent>
    </Modal>
  );
}
