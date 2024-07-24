"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@knowingly/ui/modal"
import { Button } from "@knowingly/ui/button"
import { createHubSchema, CreateHubSchema } from "@knowingly/validators"
import { useAction, useMutation } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import { Icons } from "../icons"
import { CreateHubForm } from "../forms/create-hub-form"
import { useRouter } from "next/navigation"
import { env } from "~/env"



export function CreateHubModal() {
  const [open, setOpen] = React.useState(false)
  const [isCreatePending, startCreateTransition] = React.useTransition()
  const router = useRouter()

  const createHub = useMutation(api.hubs.create)
  const pay = useAction(api.stripe.pay)


  const form = useForm<CreateHubSchema>({
    resolver: zodResolver(createHubSchema),
    defaultValues: {
      name: "",
      subdomain: "",
      description: "",
      tier: "FREE",
      isPublic: true,

    }
  })

  function onSubmit(input: CreateHubSchema) {
    startCreateTransition(async () => {
        try {
            await createHub({
            name: input.name,
            subdomain: input.subdomain,
            description: input.description,
            tier: input.tier,
            isPublic: input.isPublic,
            })
    
        } catch (error) {
            toast.error("Error: " + error)
            return
        }
        
        
        
        form.reset()
        setOpen(false)
        toast.success("Hub created")
        const redirect = `${env.NEXT_PUBLIC_PROTOCOL}://${input.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
        console.log(redirect)
        if(input.tier === "PRO"){
            const url = await pay({redirect})
            router.push(url)
        }else{
        router.push(redirect)
        }
        })
  }

    return (
      <Modal >
        <ModalTrigger className="flex items-center" >

        <Icons.circlePlus className="mr-2 size-4" aria-hidden="true" />
        Create hub

        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Create hub</ModalTitle>
            <ModalDescription>
              Fill in the details below to create a hub. 
            </ModalDescription>
          </ModalHeader>
          <CreateHubForm form={form} onSubmit={onSubmit}>
            <ModalFooter className="gap-2 pt-2 sm:space-x-0">
              <ModalClose asChild>
                <Button size={"sm"} variant="outline">
                  Cancel
                </Button>
              </ModalClose>
              <Button size={"sm"} disabled={isCreatePending || !form.getValues().name || !form.getValues().subdomain}>
                {isCreatePending && (
                  <Icons.loader
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Create
              </Button>
            </ModalFooter>
          </CreateHubForm>
        </ModalContent>
      </Modal>
    )
}