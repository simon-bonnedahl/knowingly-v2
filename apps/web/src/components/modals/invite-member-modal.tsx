"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@knowingly/ui/modal"
import { Button } from "@knowingly/ui/button"
import { InviteMemberForm } from "../forms/invite-member-form"
import type { InviteMemberSchema } from "@knowingly/validators";
import { inviteMemberSchema } from "@knowingly/validators"
import { useAction } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import type { Id } from "@knowingly/backend/convex/_generated/dataModel"
import { useSubdomain } from "~/lib/hooks/useSubdomain"
import { Icons } from "@knowingly/icons"



export function InviteMemberModal() {
  const [open, setOpen] = React.useState(false)
  const [isCreatePending, startCreateTransition] = React.useTransition()
  const subdomain = useSubdomain()

  const sendInvite = useAction(api.hubInvites.send)

  const form = useForm<InviteMemberSchema>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
      message: ""
    }
  })

  function onSubmit(input: InviteMemberSchema) {
    startCreateTransition(async () => {
      try {
        await sendInvite({
          email: input.email,
          roleId: input.roleId as Id<"roles">,
          message: input.message,
          subdomain,
  
        })

      } catch (error) {
        toast.error("Error: " + error)
        return
      }
      

  
      form.reset()
      setOpen(false)
      toast.success("Invite sent")
    })
  }

    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button variant="ringHover" size="sm">
            <Icons.usersPlus className="mr-2 size-4" aria-hidden="true" />
            Invite member
          </Button>
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
              <Button size={"sm"} disabled={isCreatePending || !form.getValues().email || !form.getValues().roleId}>
                {isCreatePending && (
                  <Icons.loader
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Invite
              </Button>
            </ModalFooter>
          </InviteMemberForm>
        </ModalContent>
      </Modal>
    )
}