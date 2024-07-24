import { api } from "@knowingly/backend/convex/_generated/api"
import { Ent } from "@knowingly/backend/convex/types"
import { Button } from "@knowingly/ui/button"
import {
    Modal,
    ModalBody,
    ModalClose,
    ModalContent,
    ModalDescription,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTrigger,
  } from "@knowingly/ui/modal"
import { Textarea } from "@knowingly/ui/textarea"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Icons } from "~/components/icons"
import { LoadingDots } from "~/components/loaders"

export const SendMessage = ({creator} : {creator : Ent<"users">}) => {
  const sendMessage = useMutation(api.messages.send)
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const onSendMessage = async () => {
    setLoading(true)
    await sendMessage({
      receiverId: creator._id,
      body: message
    })
    setLoading(false)
    router.push(`/conversations?userId=${creator._id}`)

  }
    return(
        <Modal>
      <ModalTrigger asChild>
      <Button size="sm" variant="ringHover" >
          <Icons.send className="h-5 w-5 mr-2"/>
          Send message
        </Button>
      </ModalTrigger>
      <ModalContent className="min-w-fit">
        <ModalHeader>
          <ModalTitle>Send a message</ModalTitle>
          <ModalDescription>
            Say hello to{" "}
            <span className="font-medium">
             {creator.name}

            </span>
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="min-h-40"
          />
        </ModalBody>
        <ModalFooter>
          <Button size={"sm"} onClick={onSendMessage} disabled={!message || loading}>
            {loading ? <LoadingDots color="#fff"/> : "Send"}
          </Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
    )
}