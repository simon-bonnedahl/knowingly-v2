"use client"

import * as React from "react"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalTrigger } from "@knowingly/ui/modal"
import { Button } from "@knowingly/ui/button"
import { EmailFrame } from "~/app/[domain]/hub/admin/emails/email-frame"
import { useEditorContext } from "./editor-provider"
import { Icons } from "@knowingly/icons"
import { useAction } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"
import { toast } from "sonner"



export function EmailPreviewModal() {
  const [open, setOpen] = React.useState(false)
  const { json, previewText } = useEditorContext((s) => {
    return {
      json: s.json,
      previewText: s.previewText,
    };
  });
  
  const getPreviewHtml = useAction(api.emails.preview)

  const [html, setHtml] = React.useState<string>('');

  React.useEffect(() => {
    if(!open) return
    toast.promise( getPreviewHtml({json: JSON.stringify(json), previewText}), {
      loading: "Generating preview...",
      success: (data) => {
        setHtml(data)
        return "Success: Preview generated"
      },
      error: (error) =>  `Error: ${error.data}`,
    });
  },[open])
  


    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button variant="ringHover" onClick={()=> setOpen(true)} >
            <Icons.eye className="mr-2 size-4" aria-hidden="true" />
            Preview
          </Button>
        </ModalTrigger>
        <ModalContent >
          <ModalHeader >
            <ModalTitle>Preview Email</ModalTitle>
            
          </ModalHeader>
          <EmailFrame className="h-[600px] w-full" innerHTML={html} />
    
        </ModalContent>
      </Modal>
    )
}