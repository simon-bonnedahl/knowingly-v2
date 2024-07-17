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
import { Demo } from "~/components/demo"
import { Icons } from "~/components/icons"

export const RequestMeeting = () => {
    return(
        <Modal>
      <ModalTrigger asChild>
      <Button size="sm" variant="ringHover" >
          <Icons.calendarEvent className="h-5 w-5 mr-2"/>
          Request meeting
        </Button>
      </ModalTrigger>
      <ModalContent className="min-w-fit">
        <Demo/>
      </ModalContent>
    </Modal>
    )
}