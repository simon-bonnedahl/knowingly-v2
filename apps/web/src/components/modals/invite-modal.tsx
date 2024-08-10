"use client"

import * as React from "react"
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@knowingly/ui/modal"
import { useAction, useQuery } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import Image from "next/image"
import { Avatar, AvatarImage } from "@knowingly/ui/avatar"
import { isFile, isUrl } from "@knowingly/utils"
import { Button } from "@knowingly/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


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

    const onAccept =  () => {
        toast.promise(accept({inviteToken}), {
            loading: 'Accepting...',
            success: (data) => {
                router.push(`/${data.slug}`)
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

          <Image src={hubInvite.hub.banner.value} width={400} height={200} alt="hub banner" className="w-full rounded-3xl object-cover h-40"/>
          <Avatar className="h-fit w-fit rounded-none absolute -top-4 -right-2">
            {(isUrl(hubInvite.hub.logo) || isFile(hubInvite.hub.logo)) ? (
                <AvatarImage
                  src={hubInvite.hub.logo}
                  className="size-[4.5rem] rounded-full object-cover"
                />
            ) : (
              <div className="bg-transparent">
                <p className="text-6xl ">{hubInvite.hub.logo}</p>
              </div>
            )}
          </Avatar>
          </div>

          {!isExpired ? (<div className="flex w-full flex-col gap-2">
            <div>
            <span className="font-black">{hubInvite.user?.name}</span> has invited you as  <span className="font-black">{hubInvite.role.name}</span>
            </div>
            <div className="w-full justify-end flex gap-2">
                <Button variant="ringHover" onClick={() => setOpen(false)}>Decline</Button>
                <Button variant="ringHover" onClick={() => onAccept()}>Accept</Button>

            </div>


          </div>) : (<div>
            Expired invite
          </div>)

          }
         
        </ModalContent>
      </Modal>
    )
}