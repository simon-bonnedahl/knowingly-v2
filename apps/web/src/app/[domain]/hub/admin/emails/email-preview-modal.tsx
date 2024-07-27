"use client"

import * as React from "react"
import { toast } from "sonner"
import { Modal, ModalBody, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalTitle, ModalTrigger } from "@knowingly/ui/modal"
import { Button } from "@knowingly/ui/button"
import { EmailFrame } from "~/app/[domain]/hub/admin/emails/email-frame"
import { useEditorContext } from "./editor-provider"
import { Icons } from "@knowingly/icons"
import { useAction } from "convex/react"
import { api } from "@knowingly/backend/convex/_generated/api"



export function EmailPreviewModal() {
  const { json, previewText } = useEditorContext((s) => {
    return {
      json: s.json,
      previewText: s.previewText,
    };
  });
  
  const getPreviewHtml = useAction(api.emails.preview)

  const [html, setHtml] = React.useState<string>('');

  React.useEffect(() => {
    getPreviewHtml({json: JSON.stringify(json), previewText}).then((html) => {
      setHtml(html);
    });
  },[json])
  




    return (
      <Modal >
        <ModalTrigger asChild>
          <Button variant="ringHover" >
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