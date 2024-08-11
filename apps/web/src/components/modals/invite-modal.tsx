"use client"

import * as React from "react"
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalTitle } from "@knowingly/ui/modal"
import { useAction, useQuery } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import { Avatar, AvatarImage } from "@knowingly/ui/avatar"
import { isFile, isUrl } from "@knowingly/utils"
import { Button } from "@knowingly/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Banner } from "../banner"
import Image from "next/image"
import { RenderIcon } from "../icon-picker/render-icon"


interface InviteModalProps {
    inviteToken: string | null
    }


export function InviteModal({inviteToken} : InviteModalProps){
    const hubInvite = useQuery(api.hubInvites.get, !inviteToken ? "skip" : { inviteToken})
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    const accept = useAction(api.hubInvites.accept)

    React.useEffect(() => {
        if (hubInvite) {
            setOpen(true)
        }
    }
    , [hubInvite])

    if (!hubInvite) {
        return null
    }

    const isExpired = hubInvite?.expiresAt && new Date(hubInvite.expiresAt) < new Date()
    const isValid = hubInvite.status === "PENDING"

    const onAccept =  () => {
        toast.promise(accept({inviteToken}), {
            loading: 'Accepting...',
            success: (data) => {
                router.push(`/?onboarding=member`)
              return `Profile created, redirecting...`;
            },
            error: 'Error',
          });
        setOpen(false)
    }


    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Invite to join <span className="font-black">{hubInvite.hub.name}</span> </ModalTitle>
          </ModalHeader>
          <div className="relative">
          <Image src={hubInvite.hub.banner.value} width={600} height={200} alt="Banner" className="w-full aspect-banner object-cover rounded-xl " />
          <RenderIcon
            icon={hubInvite.hub.icon}
            size={2}
            className="absolute -right-2 -top-4"
          />
        </div>
          {(!isExpired && isValid) ? (<div className="flex w-full flex-col gap-2">
            <div>

            <span className="font-black">{hubInvite.user?.name}</span> has invited you as  <span className="font-black">{hubInvite.role.name}</span>
            </div>
            <ModalFooter className="w-full justify-end flex gap-2">
                <Button variant="ringHover" onClick={() => setOpen(false)}>Decline</Button>
                <Button variant="ringHover" onClick={onAccept}>Accept</Button>

            </ModalFooter>


          </div>) : (<div>
            <span className="font-black">Expired</span> or <span className="font-black">Invalid</span> invite.
            <ModalFooter className="w-full justify-end flex gap-2">
                <Button variant="ringHover" onClick={() => setOpen(false)}>Ok</Button>
            </ModalFooter>
          </div>)

          }
         
        </ModalContent>
      </Modal>
    )
}